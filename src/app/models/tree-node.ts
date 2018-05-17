import { TreeModel } from './tree-model';
import { tryParse } from 'selenium-webdriver/http';

const childField: string = 'children';
export class TreeNode{
    treeModel: TreeModel;
    parent: TreeNode;
    level: number;
    localChildren:TreeNode[];

    constructor( data, parent:TreeNode = null, treeModel:TreeModel){
        
        Object.assign( this, data, {parent,treeModel} );
        
        this.treeModel = treeModel;
        this.parent = parent;
        this.level = this.parent ? this.parent.level + 1 : 0;
        
        this.localChildren = this.getLocalChildren(parent,treeModel);
    }
    
    private getLocalChildren(parent:TreeNode, treeModel:TreeModel): TreeNode[] {
        let nodes:TreeNode[] = [];

        let valueChildField = this[childField];
        if(valueChildField === undefined || valueChildField ===null){
            return;
        }
        nodes = this[childField]
            .map(child => new TreeNode(child,this,treeModel) );
        return nodes; 
    }
}