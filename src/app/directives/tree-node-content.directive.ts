import { Directive, ViewContainerRef } from '@angular/core';

// 定义辅助指令TreeNodeContent，用来在模板中标记插入点
@Directive({
  selector: '[treeNodeContent-host]'
})

export class TreeNodeContentDirective {

  // 依赖注入ViewContainerRef，获取对容器视图的访问权限
  constructor(public viewContainerRef: ViewContainerRef) {

  }
}