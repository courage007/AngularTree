import { Component } from '@angular/core';

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
  nodes = [
    {
        name: 'root1',
        subTitle: 'the root',
        children: [
            {
                name: 'child1.1',
                subTitle: 'a good child'
            }, {
                name: 'child1.2',
                subTitle: 'a bad child',
            }
        ]
    },
    {
      name: 'root2',
      subTitle: 'the second root',
      children: [
        {
          name: 'child2.1',
          subTitle: 'new and improved'
        }, {
          name: 'child2.2',
          subTitle: 'new and improved2',
          children: [
              {
                  name: 'subsub',
                  subTitle: 'subsub',
                  children: []
              }
          ]
        }
      ]
    },
    {
      name: 'root3',
      subTitle: 'the third root',
    },
    { 
      name: 'root4', 
      subTitle: 'the four root',
      children: [] 
    },
    { 
      name: 'root5', 
      subTitle: 'the five root',
      children: null 
    }
  ];

  nodes0 = [
    {
      name: 'root1',
      children: [
        { name: 'child1' },
        { name: 'child2' }
      ]
    },
    {
      name: 'root2',
      children: [
        { name: 'child2.1', children: [] },
        { name: 'child2.2', children: [
          {name: 'grandchild2.2.1'}
        ] }
      ]
    },
    { name: 'root3' },
    { name: 'root4', children: [] },
    { name: 'root5', children: null }
  ];

  customNameFieldOptions = { displayField: 'subTitle' };
  customTemplateOptions = { treeNodeTemplate: MyTreeNodeTemplate };
  customTemplateStringOptions = { treeNodeTemplate: CUSTOM_TEMPLATE_STRING }
  onEvent = ($event) => alert($event.node.subTitle);

}

@Component({
  template: CUSTOM_TEMPLATE_STRING
})
class MyTreeNodeTemplate {
}