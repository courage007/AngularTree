import { extend } from 'lodash';
export class TreeOptions {
  childrenField:string = 'children';
  displayField:string = 'name';
  fileTypeField:string ='fileType';//文件类型字段
  treeNodeTemplate:any = '{{ node.displayField }}';//插值表达式
  hasCustomContextMenu = false;//快捷菜单
  constructor(options = {}) {//option是一个对象
    extend(this, options);
  }
}