import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  nodes = [
    {
        name: 'root0',
        subTitle: 'the root',
        children: [
            {
                name: 'child1',
                subTitle: 'a good child'
            }, {
                name: 'child2',
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
                  subTitle: 'subsub'
              }
          ]
        }
      ]
    }
  ];

  nodes1 = [
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


}
