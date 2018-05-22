import { Injectable } from '@angular/core';
import { TreeNode } from './tree-node';
import { TREE_EVENTS } from '../constants/events';

@Injectable()
export class TreeModel {
    roots:TreeNode[];
    static focusedTree = null;
    private events:any;
    eventNames = Object.keys(TREE_EVENTS);

    setData({nodes,events}){
        const VirtualRoot = new TreeNode({ isVirtualRoot:true }, null,this);

        this.roots = nodes.map(child=>new TreeNode(child,VirtualRoot,this));

        this.events = events;
    }
    setFocus(value){
        TreeModel.focusedTree = value ? this : null;
    }
    
}


