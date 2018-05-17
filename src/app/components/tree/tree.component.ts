import { Component, OnInit } from '@angular/core';
import { TreeModel } from '../../models/tree-model';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
  nodes = [
    {
      name: 'root1',
      children: [
        { name: 'child1.1' },
        { name: 'child1.2' }
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
  
  constructor(public treeModel:TreeModel) { 
  }

  ngOnInit() {

    this.treeModel.setData(this.nodes);
  
  }

}
