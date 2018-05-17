import { Component, OnInit,Input } from '@angular/core';
import { TreeNode } from '../../models/tree-node';

@Component({
  selector: 'app-treenode',
  templateUrl: './treenode.component.html',
  styleUrls: ['./treenode.component.css']
})
export class TreenodeComponent implements OnInit {

  @Input() node : TreeNode
  constructor() { }

  ngOnInit() {
  }

}
