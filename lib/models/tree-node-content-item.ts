import { Type } from '@angular/core';

export class TreeNodeContentItem {
    constructor(public component: Type<any>, public displayData:any) {}
}