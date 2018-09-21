import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TreeComponent } from './components/tree/tree.component';
import { TreeNodeComponent } from './components/tree-node/tree-node.component';
import { TreeNodeContentComponent } from './components/tree-node-content/tree-node-content.component';
import { TreeNodeContentDirective } from './directives/tree-node-content.directive';
import { TreeNodeDropSlotComponent } from './components/tree-node-drop-slot/tree-node-drop-slot.component';

@NgModule({
  declarations: [
    TreeComponent,
    TreeNodeComponent,
    TreeNodeContentComponent,
    TreeNodeContentDirective,
    TreeNodeDropSlotComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
  ],
  entryComponents: [
    TreeNodeContentComponent
  ],
  exports:[
    TreeComponent,
    TreeNodeComponent,
    TreeNodeContentComponent,
    TreeNodeContentDirective,
    TreeNodeDropSlotComponent
  ]
})
export class TreeModule { }