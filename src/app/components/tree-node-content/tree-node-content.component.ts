import { Component, Input } from '@angular/core';
import { ITreeNodeContent } from './ITreeNodeContent';
import { TreeNode } from '../../models/tree-node';
import { TreenodeComponent } from '../treenode/treenode.component';

@Component({
  selector: 'app-tree-node-content',
  templateUrl: './tree-node-content.component.html',
  styleUrls: ['./tree-node-content.component.css']
})
export class TreeNodeContentComponent implements ITreeNodeContent{
  
  @Input() displayData: any;

  constructor() {

  }

  ngOnInit() {

  }

}
