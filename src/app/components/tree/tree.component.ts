import { Component, OnChanges, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { TreeModel } from '../../models/tree-model';
import { TreeOptions } from '../../models/tree-options';
import { KEYS } from '../../constants/keys';
import { pick, includes } from 'lodash';//将lodash安装到node-modules中，实现按需引入

//约定使用下划线表示lodash，就像用$表示jQuery一样
//1.require关键字不被识别：
// https://stackoverflow.com/questions/31173738/typescript-getting-error-ts2304-cannot-find-name-require
// declare var require: any
// const _ = require('lodash');
//2.安装lodash的es版本：
// (1) $>npm i lodash-es
// (2) $>npm install --save @types/lodash
@Component({
  selector: 'ng2tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnChanges{
    // delegating to TreeModel service:
    _nodes:any[];
    @Input() set nodes(nodes:any[]) { };
    _options:TreeOptions;
    @Input() set options(options:TreeOptions) { };
    
    @Input() set focused(value:boolean) {
      this.treeModel.setFocus(value);
      // alert('focused on the tree');
    }

    @Output() onToggle;
    @Output() onActiveChanged;
    @Output() onActivate;
    @Output() onDeactivate;
    @Output() onFocus;
    @Output() onBlur;
  
    constructor(public treeModel:TreeModel) { 
      treeModel.eventNames.forEach((name) => this[name] = new EventEmitter());//customEventName -> new EventEmitter()
    }

    ngOnChanges(changes) {
      this.treeModel.setData({
          nodes: changes.nodes && changes.nodes.currentValue,
          options: changes.options && changes.options.currentValue,
          events: pick(this, this.treeModel.eventNames)
      });
    }
    // 优先使用HostListener装饰器绑定事件，而不是使用Directive或Component的host元数据
    // When binging events to Directive or Component, Angular suggests to prefer to HostListener decorator, 
    // rather than host metadata.
    @HostListener('body: keydown', ['$event']) onKeydown($event) {
      // alert('Pressed a key');
      let focusedNode = this.treeModel.focusedNode;

      if (!this.treeModel.isFocused) return;
      if (includes([KEYS.DOWN, KEYS.UP, KEYS.LEFT,
        KEYS.RIGHT, KEYS.ENTER, KEYS.SPACE], $event.keyCode)) {
        $event.preventDefault();//取消事件的默认动作，实现仅对includes键响应
      }
  
      switch ($event.keyCode) {
        case KEYS.DOWN:
          return this.treeModel.focusNextNode();
  
        case KEYS.UP:
          return this.treeModel.focusPreviousNode();
  
        case KEYS.LEFT:
          // alert('Focus Drill Up');
          if (focusedNode.isExpanded) {
            focusedNode.toggle();
          }
          else {
            this.treeModel.focusDrillUp();
          }
          return;
  
        case KEYS.RIGHT:
          // alert('Focus Drill Down');
          if (focusedNode.isCollapsed) {
            focusedNode.toggle();
          }
          else {
            this.treeModel.focusDrillDown();
          }
          return;
  
        case KEYS.ENTER:
        case KEYS.SPACE:
          // alert('Enter or Space key.');
          return focusedNode && focusedNode.toggleActivated();
      }
    }

    @HostListener('body: mousedown', ['$event'])  onMousedown($event) {
      // alert('click');
      let insideClick = $event.target.closest('app-tree');//判断当前dom树上下文中是否包含树组件
      if (!insideClick) {
        this.treeModel.setFocus(false);
      }
    }
    
}