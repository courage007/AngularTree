import { Component } from '@angular/core';
import { DATA } from '../app/constants/outsideData';

const CUSTOM_TEMPLATE_STRING = '{{ node.name }} ({{ node.subTitle }})';

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

  customNameFieldOptions = { displayField: 'subTitle' };
  customTemplateOptions = { treeNodeTemplate: MyTreeNodeTemplate };
  customTemplateStringOptions = { treeNodeTemplate: CUSTOM_TEMPLATE_STRING }
  // onEvent = ($event) => alert($event.node.subTitle);
  // onEvent = ($event) => console.log($event);
  // 自定义事件处理器
  toggleEventHandler = ($event) => console.log($event);
  activateEventHandler = ($event) => console.log($event);
  deactivateEventHandler = ($event) => console.log($event);
  activeChangedEventHandler = ($event) => console.log($event);
  focusEventHandler = ($event) => console.log($event);
  blurEventHandler = ($event) => console.log($event);
}

@Component({
  template: CUSTOM_TEMPLATE_STRING
})
class MyTreeNodeTemplate {
  
}