import { Component, ViewChild, OnInit, Input,  ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { TreeNode } from '../../models/tree-node';
import { TreeModel } from '../../models/tree-model';
import { TreeNodeContentDirective } from '../../directives/tree-node-content.directive';
import { TreeNodeContentItem } from '../../models/tree-node-content-item';
import { TreeNodeContentComponent } from '../tree-node-content/tree-node-content.component';
import { tryParse } from 'selenium-webdriver/http';
import { notEqual } from 'assert';

@Component({
  selector: 'app-treenode',
  templateUrl: './treenode.component.html',
  styleUrls: ['./treenode.component.css']
})
export class TreenodeComponent implements OnInit {

  @Input() node : TreeNode;

  // ViewChild 是属性装饰器，用来从模板视图中获取匹配的元素
  @ViewChild(TreeNodeContentDirective) treeNodeContentHost: TreeNodeContentDirective;

  fileIconPath: string;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    viewContainerRef: ViewContainerRef) {
      
  }

  ngOnInit() {
    this._loadTreeNodeContent();
    this._initNecesaryVariables();
  }

  ngOnChanges() {

  }
  // 解决使用动态组件出现ExpressionChangedAfterItHasBeenCheckedError问题：
  // https://github.com/angular/angular/issues/17572
  _loadTreeNodeContent() {
    // 使用Item从逻辑上将TreeNodeContentComponent和data关联起来
    // 如何使用自定义StringTemplate还是个问题: 没能解决
    let treeNodeContentItem: TreeNodeContentItem = new TreeNodeContentItem(
      TreeNodeContentComponent, this.node.displayField);
    
    // 使用 ComponentFactoryResolver 来为每个具体的组件解析出一个 ComponentFactory 
    // 然后 ComponentFactory 会为每一个组件创建一个实例
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(treeNodeContentItem.component);

    let viewContainerRef = this.treeNodeContentHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    
    //传入数据
    componentRef.instance.displayData = treeNodeContentItem.displayData;

  }

  _initNecesaryVariables()
  {
    this._initFileIconPath();
  }

  _initFileIconPath()
  {
    let fileType: string = this.node['fileType'];//后续还得优化
    this.fileIconPath = this.node.isLeaf && fileType &&  '../../../assets/icons/file_type_' + fileType +'.svg';
  }

}
