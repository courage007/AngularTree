import { ITreeOptions } from '../defs/api';

export class TreeOptions {
  get childrenField(): string { return this.options.childrenField || 'children'}
  get displayField(): string { return this.options.displayField || 'name'}
  get isExpandedField(): string { return this.options.isExpandedField || 'isExpanded'}
  get treeNodeTemplate(): any { return this.options.treeNodeTemplate || '{{ node.displayField }}' }//插值表达式
  get allowDrag(): boolean { return this.options.allowDrag }//是否启用拖拽功能

  constructor(private options: ITreeOptions = {}) {//option是一个对象
    // nothing need to do
  }
}