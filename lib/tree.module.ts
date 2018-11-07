import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TreeComponent } from './components/tree/tree.component';
import { TreeNodeComponent } from './components/tree-node/tree-node.component';
import { TreeNodeContentComponent } from './components/tree-node-content/tree-node-content.component';
import { TreeNodeContentDirective } from './directives/tree-node-content.directive';
import { TreeNodeDropSlotComponent } from './components/tree-node-drop-slot/tree-node-drop-slot.component';
import { CustomContexMenuComponent } from './components/tree-node/custom-contex-menu.component';
import { ContextMenuModule } from 'ngx-contextmenu';

@NgModule({
  declarations: [
    CustomContexMenuComponent,
    TreeComponent,
    TreeNodeComponent,
    TreeNodeContentComponent,
    TreeNodeContentDirective,
    TreeNodeDropSlotComponent
  ],
  imports: [
    ContextMenuModule.forRoot({
      autoFocus: true,
      // useBootstrap4: true,
    }),
    CommonModule
  ],
  providers: [
  ],
  entryComponents: [
    CustomContexMenuComponent,
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