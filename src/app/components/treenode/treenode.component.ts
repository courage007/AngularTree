import { Component, ViewChild, OnInit, Input,  ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { TreeNode } from '../../models/tree-node';
import { TreeModel } from '../../models/tree-model';
import { TreeNodeContentDirective } from '../../directives/tree-node-content.directive';
import { TreeNodeContentItem } from '../../models/tree-node-content-item';
import { TreeNodeContentComponent } from '../tree-node-content/tree-node-content.component';
import { tryParse } from 'selenium-webdriver/http';

@Component({
  selector: 'app-treenode',
  templateUrl: './treenode.component.html',
  styleUrls: ['./treenode.component.css']
})
export class TreenodeComponent implements OnInit {

  @Input() node : TreeNode;

  // ViewChild作用是什么
  @ViewChild(TreeNodeContentDirective) treeNodeContentHost: TreeNodeContentDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    viewContainerRef: ViewContainerRef) {
      
  }

  ngOnInit() {
    this._loadTreeNodeContent();
  }

  ngOnChanges() {

  }
  // 解决使用动态组件出现ExpressionChangedAfterItHasBeenCheckedError问题：
  // https://github.com/angular/angular/issues/17572
  _loadTreeNodeContent() {
    //使用Item从逻辑上将TreeNodeContentComponent和data关联起来
    let treeNodeContentItem: TreeNodeContentItem = new TreeNodeContentItem(
      TreeNodeContentComponent,this.node.displayField);
    
    // 使用 ComponentFactoryResolver 来为每个具体的组件解析出一个 ComponentFactory 
    // 然后 ComponentFactory 会为每一个组件创建一个实例
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(treeNodeContentItem.component);

    let viewContainerRef = this.treeNodeContentHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    
    componentRef.instance.displayData = treeNodeContentItem.displayData;//传入数据

  }

}
