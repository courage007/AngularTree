/**
* This is the interface of the options input of the tree.
*/
export interface ITreeOptions {
    /**
     * Override id field. Default: 'id'
     */
    idField?: string;
    /**
     * Override children field. Default: 'children'
     */
    childrenField?: string;
    /**
     * Override display field. Default: 'name'
     */
    displayField?: string;
    /**
     * Override type field. Default: 'type'
     */
    typeField?: string;
    /**
     * Override isExpanded field. Default: 'isExpanded'
     */
    isExpandedField?:string;
    /**
     * Allow drag and drop on the tree. Default: false
     */
    allowDrag?: boolean;
    /**
     * Enable Context-Menu on the tree. Default: false
     */
    enableCustomContextMenu?: boolean;
    /**
     * Override tree node template. Default: '{{ node.displayField }}'
     */
    treeNodeTemplate?: any;

    
}