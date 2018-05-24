import { extend } from 'lodash';
export class TreeOptions {
  childrenField:string = 'children';
  displayField:string = 'name';
  treeNodeTemplate:any = '{{ node.displayField }}';//插值表达式
  constructor(options = {}) {//option是一个对象
    extend(this, options);
  }
}