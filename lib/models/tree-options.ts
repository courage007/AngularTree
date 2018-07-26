import { ITreeOptions } from '../defs/api';

export class TreeOptions {
  // 字段不应直接暴露
  get idField(): string { return this.options.childrenField || 'id'}
  get displayField(): string { return this.options.displayField || 'name'}
  get typeField():string {return this.options.typeField || 'type'}
  get childrenField(): string { return this.options.childrenField || 'children'}
  get isExpandedField(): string { return this.options.isExpandedField || 'isExpanded'}
  get treeNodeTemplate(): any { return this.options.treeNodeTemplate || '{{ node.displayField }}' }//插值表达式
  get allowDrag(): boolean { return this.options.allowDrag }//是否启用拖拽功能
  get enableCustomContextMenu(): boolean{ return this.options.enableCustomContextMenu }//是否启用快捷菜单

  constructor(private options: ITreeOptions = {}) {//option是一个对象
    // nothing need to do
  }
}