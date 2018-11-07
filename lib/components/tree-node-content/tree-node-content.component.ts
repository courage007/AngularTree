import { Component, Input, Output, EventEmitter, OnInit, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { ITreeNodeContent } from './ITreeNodeContent';

@Component({
  selector: 'ng2tree-node-content',
  templateUrl: './tree-node-content.component.html',
  styleUrls: ['./tree-node-content.component.css']
})
export class TreeNodeContentComponent implements ITreeNodeContent, OnInit {

  @Input() displayData: any;
  @Input() originData: any;
  @Output() rightMenuClicked = new EventEmitter<any>();

  @ViewChild('rightMenuContainer', { read: ViewContainerRef }) rightMenuContainer: ViewContainerRef;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {

  }
  ngOnInit() {
    // 右键菜单相关
    this.rightMenuContainer.clear();
    if (this.originData.hasRightClickMenu) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.originData.rightClickMenuComponent);
      const componentRef = this.rightMenuContainer.createComponent(componentFactory);
      
      componentRef.instance['nodeData'] = this.originData;
      componentRef.instance['rightMenuClicked'].subscribe((event) => {
        this.rightMenuClicked.emit(event);
      });
    }
  }
}
