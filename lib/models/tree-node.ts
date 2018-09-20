import { ElementRef } from '@angular/core';
import { TreeModel } from './tree-model';
import { TREE_EVENTS } from '../constants/events';
import { TreeOptions } from './tree-options';

export class TreeNode{
    private _isExpanded: boolean;
    get isExpanded(){return this._isExpanded}
    set isExpanded(value){this._isExpanded = value}
    get isCollapsed(){return !this._isExpanded}

    treeModel: TreeModel;
    parent: TreeNode;
    level: number;
    isVirtualRoot: boolean = false;
    elementRef:ElementRef;
    
    _isActive: boolean = false;
    get isActive(){
        return this._isActive;
    }

    constructor(public data, parent: TreeNode = null, treeModel: TreeModel){
        
        Object.assign( this, data, {parent,treeModel} );
        
        this.treeModel = treeModel;
        this.parent = parent;
        this.level = this.parent ? this.parent.level + 1 : 0;
        if(this.isExpandedField) {
            this.isExpanded = true;
        }
        
        // 验证字段添加
        // console.log(this.idField);
        // console.log(this.typeField);
        
        this.childrenField = this.childrenField.map(child => new TreeNode(child,this,treeModel) );
    }

    // Proxy of treeModel
    get options(): TreeOptions{ 
        return this.treeModel.options 
    }
    fireEvent(event) { 
        this.treeModel.fireEvent(event)
    }

    // 表现的更像一个字段，将其封装成属性，并根据开放的读写权限，设置get/set
    get idField() {
        return this[this.options.idField];
    }
    
    set idField(value) {
        this[this.options.idField] = value;
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

    get typeField(){
        return this[this.options.typeField];
    }

    set typeField(value){
        this[this.options.typeField] = value;
    }

    get isExpandedField(){
        return this[this.options.isExpandedField];
    }
    set isExpandedField(value){
        this[this.options.isExpandedField] = value;
    }

    allowDrag() {//表现的更像一个动作，将其封装成方法
        return this.options.allowDrag;
    }

    enableCustomContextMenu() {
        return this.options.enableCustomContextMenu;
    }

    get isRoot() { return this.parent.isVirtualRoot }//父节点为空，表示这个一个根节点
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

    isDescendantOf(node: TreeNode) {
        if (this === node){
            return true;
        } else {
            return this.parent && this.parent.isDescendantOf(node);
        }
    }

    // 切换方法
    // 切换节点的折叠（Collapsed）与扩展（Expanded）状态
    toggle() {
        this.isExpanded = !this.isExpanded;
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
    
    // 双击事件
    doublClick(rawEvent: MouseEvent) {
        this.fireEvent({ eventName: TREE_EVENTS.onDoubleClick, node: this, rawEvent: rawEvent });
    }

    // 右键快捷菜单
    contextMenu(rawEvent: MouseEvent) {
        if (this.enableCustomContextMenu()) {//启用右键菜单功能后，禁用默认的右键菜单
            rawEvent.preventDefault();
        }

        this.fireEvent({ eventName: TREE_EVENTS.onContextMenu, node: this, rawEvent: rawEvent }); 
    }

    dropMouseAction($event, data: any = null){
        // 1.设置focus
        this.treeModel.setFocus(true);
        // 2.执行事件处理器
        this._dropEventHandler(this.treeModel, this, $event, data);
        // 3.完成drop操作后，重置drag状态
        this.treeModel.cancelDrag();
    }

    private _dropEventHandler(tree: TreeModel, node: TreeNode, $event: any , 
        to: { parentNode: TreeNode, index: number}){
        tree.moveNode({ from: tree.getDragNode(), to });
        // console.log("dropEventHandler:"+tree.roots);
    }
}