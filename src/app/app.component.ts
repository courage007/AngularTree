import { Component, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { DATA } from '../app/constants/outsideData';
import { ContextMenuService, ContextMenuComponent } from 'ngx-contextmenu';

export const mockTree = [
  {
    id: 1,
    name: '节点1',
    subTitle: 'the root',
    isExpanded: true,
    children: [
      {
        id: 11,
        code: 'node11',
        name: '节点11',
        subTitle: 'the root',
        isExpanded: true,
        children: []
      },
      {
        id: 12,
        code: 'node12',
        name: '节点12',
        isExpanded: true,
        subTitle: 'the root',
        children: []
      },
      {
        id: 13,
        code: 'node13',
        name: '节点13',
        isExpanded: true,
        subTitle: 'the root',
        children: []
      }
    ]
  }
];


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  styles: [
    `button: {
      line - height: 24px;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
      border: none;
      border-radius: 2px;
      background: #A3D9F5;
      cursor: pointer;
      margin: 0 3px;
    }`
  ],
  entryComponents:[
    ContextMenuComponent
  ]
})

export class AppComponent {
  title = 'app';
  nodes = DATA; // Outside static Data
  nodes0 = [{
    id: 'x',
    name: 'rootx',
    subTitle: 'the root',
    type: 'typex',
    children: null
  }];

  // Optional

  constructor(private contextMenuService: ContextMenuService, private componentFactoryResolver: ComponentFactoryResolver) {

  }

  updateTreeData() {
    this.nodes = mockTree;
  }

  // Options 调整接口
  customTemplateStringOptions = {
    // displayField: 'subTitle',
    allowDrag: false, //设置是否支持拖放
    enableCustomContextMenu: false //设置是否启用自定义右键菜单
  }

  // onEvent = ($event) => alert($event.node.subTitle);
  // onEvent = ($event) => console.log($event);
  // 自定义事件处理器
  toggleEventHandler = ($event) => console.log($event);
  activateEventHandler = ($event) => console.log($event);
  deactivateEventHandler = ($event) => console.log($event);
  activeChangedEventHandler = ($event) => console.log($event);
  focusEventHandler = ($event) => console.log($event);
  blurEventHandler = ($event) => console.log($event);
  doubleClickEventHandler($event) {
    console.log("Double Click Handler. The event is:", $event);
  }
  
  @ViewChild('customContextmenu') customContextmenu: ContextMenuComponent;
  contextMenuEventHandler(param) {
    const $event = param.rawEvent;
    const item = param.item;

    $event.preventDefault();
    
    // 动态创建自定义右键菜单
    this.contextMenuService.show.next({
      // Optional - if unspecified, all context menu components will open
      contextMenu: this.customContextmenu,
      event: $event,
      item: item,
    });

    $event.stopPropagation();
  }

  public items: any[] = [{
    name: 'One',
    url: '/one',
  }, {
    name: 'Two',
    url: '/two',
  }];

  showMessage(message: any) {
    console.log(message);
  }

  go(item: any) {
    // this.router.navigateByUrl(item.url);
  }


}
