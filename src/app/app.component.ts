import { Component } from '@angular/core';

// 设置需要显示的值
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
  nodes = [//json数组
    {
        name: 'root1',
        fileType: '0',//文件夹
        children: [
            {
                name: 'child1.1',
                fileType:'css',//css文件
                fileIconPath:'',
            }, {
                name: 'child1.2',
                fileType:'html',//html文件
            }
        ]
    },
    {
      name: 'root2',
      children: [
        {
          name: 'child2.1',
          fileType: 'git',//git文件
        }, {
          name: 'child2.2',
          fileType: '0',//文件夹
          children: [
              {
                  name: 'subsub',
                  fileType: 'c',//c文件
                  children: []
              }
          ]
        }
      ]
    },
    {
      name: 'root3',
      fileType: 'ts',//ts文件
    },
    { 
      name: 'root4', 
      fileType: 'ts',//ts文件
      children: [] 
    },
    { 
      name: 'root5', 
      fileType: 'ts',//ts文件
      children: null 
    }
  ];

  customNameFieldOptions = { displayField: 'subTitle' };
  customTemplateOptions = { treeNodeTemplate: MyTreeNodeTemplate };
  customTemplateStringOptions = { treeNodeTemplate: CUSTOM_TEMPLATE_STRING }
  
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