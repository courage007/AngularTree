import { Component, ViewChild, OnInit, Input, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { TreeNode } from '../../models/tree-node';
import { TreeModel } from '../../models/tree-model';
import { TreeNodeContentDirective } from '../../directives/tree-node-content.directive';
import { TreeNodeContentItem } from '../../models/tree-node-content-item';
import { TreeNodeContentComponent } from '../tree-node-content/tree-node-content.component';
import { CustomContexMenuComponent } from './custom-contex-menu.component';
import { TREE_EVENTS } from '../../constants/events';

@Component({
  selector: 'ng2tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.css']
})
export class TreeNodeComponent implements OnInit {

  @Input() node: TreeNode;
  @Input() nodeIndex: number;

  // TODO: move to draggable directive
  onDragStart($event) {
    // 设置DragNode: 选择dragNode的父节点作为DragNode，通过index定位到指定的节点
    setTimeout(() => this.node.treeModel.setDragNode({ parentNode: this.node.parent, index: this.nodeIndex }), 30);
  }

  onDragEnd() {
    this.node.treeModel.setDragNode(null);
  }

  onDragOver($event) {
    $event.preventDefault();
    this.node.treeModel.setDropLocation({ component: this, parentNode: this.node, index: 0 });
  }

  onDrop($event) {
    $event.preventDefault();
    // this.node.mouseAction('drop', $event, { node: this.node, index: 0 });
    this.node.treeModel.setFocus(true);
    this.node.dropMouseAction($event, { parentNode: this.node, index: 0 });
    console.log("onDrop: tree-node-component");
  }

  onDragLeave(nodeContentWrapper, $event) {
    if (!this.node.treeModel.isDraggingOver(this)) {
      return;
    }

    const rect = nodeContentWrapper.getBoundingClientRect();

    // If outside the element
    if ($event.clientX < rect.left || $event.clientX > rect.right ||
      $event.clientY < rect.top || $event.clientY > rect.bottom) {

      this.node.treeModel.setDropLocation(null);
    }
  }

  // ViewChild 是属性装饰器，用来从模板视图中获取匹配的元素
  @ViewChild(TreeNodeContentDirective) treeNodeContentHost: TreeNodeContentDirective;

  @ViewChild('contextMenuContainer', { read: ViewContainerRef }) contextMenuContainer: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    viewContainerRef: ViewContainerRef) {

  }

  ngOnInit() {
    this._loadTreeNodeContent();
  }

  // 解决使用动态组件出现ExpressionChangedAfterItHasBeenCheckedError问题：
  // https://github.com/angular/angular/issues/17572
  _loadTreeNodeContent() {

    // 使用Item从逻辑上将TreeNodeContentComponent和data关联起来
    let treeNodeContentItem: TreeNodeContentItem = new TreeNodeContentItem(
      TreeNodeContentComponent, this.node.displayField);

    // 使用 ComponentFactoryResolver 来为每个具体的组件解析出一个 ComponentFactory 
    // 然后 ComponentFactory 会为每一个组件创建一个实例
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(treeNodeContentItem.component);

    let viewContainerRef = this.treeNodeContentHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);

    componentRef.instance.displayData = treeNodeContentItem.displayData; // 传入数据
    componentRef.instance.originData = this.node.data;
    componentRef.instance.rightMenuClicked.subscribe(event => {
      this.node.rightMenuClicked(event);
    });


  }

  // 右键快捷菜单
  contextMenu(rawEvent: MouseEvent) {
    rawEvent.preventDefault();
    
    // 动态添加组件
    this.contextMenuContainer.clear();
    const contexMenuComponentFactory = this.componentFactoryResolver.resolveComponentFactory(CustomContexMenuComponent);
    const contexMenuComponentRef = this.contextMenuContainer.createComponent(contexMenuComponentFactory);

    contexMenuComponentRef.instance.testData = 'tree node传递数据到 context menu';

    this.node.fireEvent({ eventName: TREE_EVENTS.onContextMenu, node: this, rawEvent: rawEvent }); 
  }
}
