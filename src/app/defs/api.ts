/**
* This is the interface of the options input of the tree.
*/
export interface ITreeOptions {
    /**
     * Override children field. Default: 'children'
     */
    childrenField?: string;
    /**
     * Override display field. Default: 'name'
     */
    displayField?: string;
    /**
     * Override isExpanded field. Default: 'isExpanded'
     */
    isExpandedField?:string;
    /**
     * Allow drag and drop on the tree. Default: false
     */
    allowDrag?: boolean;
    /**
     * Override tree node template. Default: '{{ node.displayField }}'
     */
    treeNodeTemplate?: any;
}