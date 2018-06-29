import { Injectable } from '@angular/core';
import { TreeNode } from './tree-node';
import { TreeOptions } from './tree-options';
import { TREE_EVENTS } from '../constants/events';
import { first, last } from 'lodash';

@Injectable()
export class TreeModel {
    roots:TreeNode[];
    options: TreeOptions = new TreeOptions();
    static focusedTree = null;
    // focused Node may be not actived 
    // actived Node must be focused
    focusedNode: TreeNode = null;// be chosen node
    activeNode: TreeNode = null;// be chosen and actived node
    private events:any;
    eventNames = Object.keys(TREE_EVENTS);

    firstUpdate = true;
    _dragNode: { parentNode: TreeNode, index: number } = null;
    _dropLocation:{ component: any, parentNode: TreeNode, index: number } = null;

    setData({nodes, options, events}){

        this.options = new TreeOptions(options);
        this.events = events;

        this.update(nodes);
    }

    virtualRoot: TreeNode;
    update(nodes){
        // Update the tree:

        this.virtualRoot = new TreeNode({ isVirtualRoot: true }, null,this);

        this.roots = nodes && nodes.map(child => new TreeNode(child, this.virtualRoot, this));

        this.virtualRoot[this.options.childrenField] = this.roots;
  
        this._loadTreeNodeContentComponent();
    
        // Fire event:
        if (this.firstUpdate) {
            if (this.roots) {
                this.fireEvent({ eventName: TREE_EVENTS.onInitialized });
                this.firstUpdate = false;
            }
        } else {
            this.fireEvent({ eventName: TREE_EVENTS.onUpdateData });
        }
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
        let previousNode = this.focusedNode;
        let nextNode = previousNode ? previousNode.findNextNode() : this.getFirstRoot();
        nextNode && nextNode.focus() // Short-circuit evaluation
    }

    focusPreviousNode() {
        let previousNode = this.focusedNode;
        let nextNode = previousNode ? previousNode.findPreviousNode() : this.getLastRoot();
        nextNode && nextNode.focus();
    }

    focusDrillUp(){
        let previousNode = this.focusedNode;
        let nextNode = previousNode && previousNode.realParent;
        nextNode && nextNode.focus();
    }

    focusDrillDown() {
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

    /**
     * 判断是否执行移动节点操作，可以移动返回true，否则返回false
     * @param param0 param0.from 待移动节点的原有父节点
     *               param0.to 待移动节点的新父节点
     */
    canMoveNode({ from, to }) {
        // same node
        if (from.parentNode === to.parentNode && from.index === to.index) {
          return false;
        }
    
        const fromChildren = from.parentNode.children;
        const fromNode = fromChildren[from.index];
        
        return !to.parentNode.isDescendantOf(fromNode);
    }

    /**
     * 移动节点
     * @param param0 param0.from 待移动节点的原有父节点
     *               param0.to 待移动节点的新父节点
     */
    moveNode({ from, to }) {
        if (!this.canMoveNode({ from , to })) return;
    
        const fromChildren = from.parentNode.childrenField;
    
        // If node doesn't have children - create children array
        if (!to.parentNode.childrenField) {
          to.parentNode.childrenField = [];
        }
        const toChildren = to.parentNode.childrenField;
        
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
        // The splice() method changes the contents of an array by removing existing elements and/or adding new elements.
        const node = fromChildren.splice(from.index, 1)[0];
    
        // Compensate for index if already removed from parent:
        let toIndex = (from.parentNode === to.parentNode && to.index > from.index) ? to.index - 1 : to.index;
    
        toChildren.splice(toIndex, 0, node);

        console.log("toChildren:" + toChildren);

        console.log("AfterMoveNode:" + this.roots);
    
        this.update(this.roots);// 实现node moved后，重新刷新这棵树
    
        this.fireEvent({ eventName: TREE_EVENTS.onMoveNode, node, to });
    }
    
    // TODO: move to a different service:
    setDragNode(dragNode:{ parentNode: TreeNode, index: number }) {
        this._dragNode = dragNode;
    }
    
    getDragNode():{ parentNode: TreeNode, index:number } {
        return this._dragNode || { parentNode: null, index: null };
    }
    
    isDragging() {
        return this.getDragNode().parentNode;
    }
    
    setDropLocation(dropLocation: { component: any, parentNode: TreeNode, index: number }) {
        this._dropLocation = dropLocation;
    }
    
    getDropLocation(): { component: any, parentNode: TreeNode, index: number } {
        return this._dropLocation || {component: null, parentNode: null, index: null};
    }
    
    isDraggingOver(component) {
        return this.getDropLocation().component === component;
    }
    
    cancelDrag() {
        this.setDropLocation(null);
        this.setDragNode(null);
    }
}