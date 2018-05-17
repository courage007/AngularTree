import { Injectable } from '@angular/core';
import { TreeNode } from './tree-node';

@Injectable()
export class TreeModel {
    roots:TreeNode[];

    setData(nodes){
        const VirtualRoot = new TreeNode({ isVirtualRoot:true }, null,this);

        this.roots = nodes.map(child=>new TreeNode(child,VirtualRoot,this));
    }
}