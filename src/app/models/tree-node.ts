import { ElementRef } from '@angular/core';
import { TreeModel } from './tree-model';
import { TreeOptions } from './tree-options';
import { first,last } from 'lodash';
import { TREE_EVENTS } from '../constants/events';

export class TreeNode{
    private _isExpanded: boolean = false;// flag of Expand or Collapse
    get isExpanded() { return this._isExpanded };//更简洁，更人性化
    get isCollapsed(){ return !this._isExpanded };
    
    treeModel: TreeModel;
    parent: TreeNode;
    level: number;
    isVirtualRoot: boolean = false;
    elementRef:ElementRef;
    
    _isActive: boolean = false;
    get isActive(){
        return this._isActive;
    }

    constructor( data, parent:TreeNode = null, treeModel:TreeModel){
        
        Object.assign( this, data, {parent,treeModel} );
        
        this.treeModel = treeModel;
        this.parent = parent;
        this.level = this.parent ? this.parent.level + 1 : 0;
        
        this.childrenField = this.childrenField.map(child => new TreeNode(child,this,treeModel) );
    }

    // Proxy of treeModel
    get options() { return this.treeModel.options }
    fireEvent(event) { 
        this.treeModel.fireEvent(event)
    }

    get childrenField() {
        return this[this.options.childrenField] || [];
    }
    
    set childrenField(value) {
        this[this.options.childrenField] = value;
    }

    get displayField(){
        return this[this.options.displayField];
    }

    get isRoot() { return this.parent.isVirtualRoot }
    get realParent() { return this.isRoot ? null : this.parent }
    get isLeaf() { return !this.childrenField.length }
    get hasChildren() { return !this.isLeaf }
    get isFocused(){return this.treeModel.focusedNode == this}

    getFirstChild() {
        return this.childrenField && this.childrenField[0];
    }

    getLastChild() {
        return this.childrenField && this.childrenField[this.childrenField.length-1];
    }
    
    private _getIndexInParent() {
        return this.parent && this.parent.childrenField.indexOf(this);
    }

    findAdjacentSibling(steps) {
        let index = this._getIndexInParent();
        return this.parent && this.parent.childrenField[index + steps];
    }
        
    findNextSibling() {
        return this.findAdjacentSibling(+1);
    }
    findPreviousSibling() {
        return this.findAdjacentSibling(-1);
    }

    findNextNode(goInside = true) {// 查找Next Node时，默认进行内部查找
        return goInside && this.isExpanded && this.getFirstChild() ||
               this.findNextSibling() ||
               this.parent && this.parent.findNextNode(false);
    }

    findPreviousNode() {
        let previousSibling = this.findPreviousSibling();
        if (!previousSibling) {
          return this.realParent;
        }
        return previousSibling.isCollapsed
          ? previousSibling
          : previousSibling.getLastChild();
    }

    // 切换方法
    // 切换节点的折叠（Collapsed）与扩展（Expanded）状态
    toggle() {
        this._isExpanded = !this.isExpanded;
        this.fireEvent({ eventName: TREE_EVENTS.onToggle, node: this, isExpanded: this.isExpanded });
    }

    private _activate() {
        this._isActive = true;
        this.fireEvent({ eventName: TREE_EVENTS.onActivate, node: this });
        this.focus();
    }
    
    private _deactivate() {
        this._isActive = false;
        this.fireEvent({ eventName: TREE_EVENTS.onDeactivate, node: this });
    }

    toggleActivated() {
        if (this.isActive) {
            this._deactivate();
            this.treeModel.activeNode = null;
        }
        else {
            if (this.treeModel.activeNode) {
            this.treeModel.activeNode._deactivate();
            }
            this._activate();
            this.treeModel.activeNode = this;
        }
        this.fireEvent({ eventName: TREE_EVENTS.onActiveChanged, node: this, isActive: this.isActive });
    }

    focus() {
        let previousNode = this.treeModel.focusedNode;
        this.treeModel.focusedNode = this;
        if (previousNode) {
            this.fireEvent({ eventName: TREE_EVENTS.onBlur, node: previousNode });
        }
        this.fireEvent({ eventName: TREE_EVENTS.onFocus, node: this });
    }

    blur() {
        let previousNode = this.treeModel.focusedNode;
        this.treeModel.focusedNode = null;
        if (previousNode) {
            this.fireEvent({ eventName: TREE_EVENTS.onBlur, node: this });
        }
    }
}

