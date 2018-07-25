import { Component } from '@angular/core';
import { DATA } from '../app/constants/outsideData';

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
})

export class AppComponent {
  title = 'app';
  nodes = DATA ; // Outside static Data

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
  doubleClickEventHandler = ($event) => console.log($event);
  contextMenuEventHandler = ($event) => console.log("Show ContextMenu:with or without custom contex menu",$event);

}