import { Component, OnChanges, Input, EventEmitter } from '@angular/core';
import { TreeModel } from '../../models/tree-model';

//约定使用下划线表示lodash，就像用$表示jQuery一样
const _ = require('lodash');

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnChanges{
    // delegating to TreeModel service:
    _nodes:any[];
    @Input() set nodes(nodes:any[]) { };
  
    @Input() set focused(value:boolean) {
      this.treeModel.setFocus(value);
    }
  
    constructor(public treeModel:TreeModel) { 
      treeModel.eventNames.forEach((name) => this[name] = new EventEmitter());
    }

    ngOnChanges(changes) {
      this.treeModel.setData({
          nodes: changes.nodes && changes.nodes.currentValue,
          events: _.pick(this, this.treeModel.eventNames)
      });
    }

}
