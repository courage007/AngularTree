import { TreeModel } from './tree-model';
import { TreeOptions } from './tree-options';
export class TreeNode{
    treeModel: TreeModel;
    parent: TreeNode;
    options:TreeOptions;
    level: number;

    constructor( data, parent:TreeNode = null, treeModel:TreeModel){
        
        Object.assign( this, data, {parent,treeModel} );
        
        this.treeModel = treeModel;
        this.parent = parent;
        this.options = treeModel.options;
        this.level = this.parent ? this.parent.level + 1 : 0;
        
        this.childrenField = this.childrenField.map(child => new TreeNode(child,this,treeModel) );
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

    nextNode(){
         
    }

    // 切换方法
    // 切换节点的折叠（Collapsed）与扩展（Expanded）状态
    toggle(){
        //
    }
}