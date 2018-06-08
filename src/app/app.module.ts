import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TreeComponent } from './components/tree/tree.component';
import { TreenodeComponent } from './components/treenode/treenode.component';
import { TreeModel } from './models/tree-model';
import { TreeNodeContentComponent } from './components/tree-node-content/tree-node-content.component';
import { TreeNodeContentDirective } from './directives/tree-node-content.directive';
import { FileTreePanelComponent } from './components/file-tree-panel/file-tree-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    TreeComponent,
    TreenodeComponent,
    TreeNodeContentComponent,
    TreeNodeContentDirective,
    FileTreePanelComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    TreeModel
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    TreeNodeContentComponent
  ]
})
export class AppModule { }
