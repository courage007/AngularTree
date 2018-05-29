import { Injectable } from '@angular/core';
import { TreeNode } from './tree-node';
import { TreeOptions } from './tree-options';
import { TREE_EVENTS } from '../constants/events';
import { first, last } from 'lodash';

@Injectable()
export class TreeModel {
    roots:TreeNode[];
    options: TreeOptions;
    static focusedTree = null;
    // focused Node may be not actived 
    // actived Node must be focused
    focusedNode: TreeNode = null;// be chosen node
    activeNode: TreeNode = null;// be chosen and actived node
    private events:any;
    eventNames = Object.keys(TREE_EVENTS);

    setData({nodes,options, events}){
        this.options = new TreeOptions(options);

        const VirtualRoot = new TreeNode({ isVirtualRoot:true }, null,this);

        this.roots = nodes && nodes.map(child=>new TreeNode(child,VirtualRoot,this));

        VirtualRoot[this.options.childrenField] = this.roots;//

        this._loadTreeNodeContentComponent();

        this.events = events;
    }

    private _treeNodeContentComponent:any;
    get treeNodeContentComponent() { return this._treeNodeContentComponent };
    // if treeNodeTemplate is a component - use it,
    // otherwise - it's a template, so wrap it with an AdHoc component
    _loadTreeNodeContentComponent() {
        this._treeNodeContentComponent = this.options.treeNodeTemplate;
        if (typeof this._treeNodeContentComponent === 'string') {
        // this._treeNodeContentComponent = this._createAdHocComponent(this._treeNodeContentComponent);
        }
    }

    // _createAdHocComponent(templateStr) {
    //     @Component({
    //         selector: 'TreeNodeTemplate',
    //         template: templateStr
    //     })
    //     class AdHocTreeNodeTemplateComponent {
    //         @Input() node: TreeNode;
    //     }
    //     return AdHocTreeNodeTemplateComponent;
    // }

    isFocused()
    {
        return TreeModel.focusedTree === this;
    }
    setFocus(value){
        TreeModel.focusedTree = value ? this : null;
    }
    getFirstRoot(){
        return first(this.roots);
    }
    getLastRoot(){
        return last(this.roots);
    }
    focusNextNode() {
        // alert('focuseOnNextNode');
        let previousNode = this.focusedNode;
        let nextNode = previousNode ? previousNode.findNextNode() : this.getFirstRoot();
        nextNode && nextNode.focus() // Short-circuit evaluation
    }

    focusPreviousNode() {
        // alert('focusPreviousNode');
        let previousNode = this.focusedNode;
        let nextNode = previousNode ? previousNode.findPreviousNode() : this.getLastRoot();
        nextNode && nextNode.focus();
    }

    focusDrillUp(){
        // alert('focusDrillUpNode');
        let previousNode = this.focusedNode;
        let nextNode = previousNode && previousNode.realParent;
        nextNode && nextNode.focus();
    }

    focusDrillDown() {
        // alert('focusDrillDownNode');
        let previousNode = this.focusedNode;
        let nextNode = previousNode && previousNode.getFirstChild();
        nextNode && nextNode.focus();
    }

    fireEvent(event) {
        // https://stackoverflow.com/questions/35840576/differencse-between-eventemitter-next-and-eventemitter-emit-in-angular-2
        //  abandon next() function, begin to use emit() function
        // this.events[event.eventName].next(event);
        // this.events[event.eventName].emit(event,alert(event.eventName));//发射事件，并传递事件的对象
        this.events[event.eventName].emit(event);

    }
    
}