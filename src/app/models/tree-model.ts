import { Injectable } from '@angular/core';
import { TreeNode } from './tree-node';
import { TreeOptions } from './tree-options';
import { TREE_EVENTS } from '../constants/events';

@Injectable()
export class TreeModel {
    roots:TreeNode[];
    options: TreeOptions;
    static focusedTree = null;
    // focused Node may be not actived 
    // actived Node must be focused
    focusedNode: TreeNode = null;// be chosen node
    activedNode: TreeNode = null;// be chosen and actived node
    private events:any;
    eventNames = Object.keys(TREE_EVENTS);

    setData({nodes,options, events}){
        this.options = new TreeOptions(options);

        const VirtualRoot = new TreeNode({ isVirtualRoot:true }, null,this);

        this.roots = nodes.map(child=>new TreeNode(child,VirtualRoot,this));

        VirtualRoot[this.options.childrenField] = this.roots;//

        this.events = events;
    }
    isFocused()
    {
        return TreeModel.focusedTree === this;
    }
    setFocus(value){
        TreeModel.focusedTree = value ? this : null;
    }

    focusNextNode() {
        // alert('focuseOnNextNode');
        
    }

    focusPreviousNode() {
        // alert('focusPreviousNode');

    }

    
}


