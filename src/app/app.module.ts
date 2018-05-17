import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TreeComponent } from './components/tree/tree.component';
import { TreenodeComponent } from './components/treenode/treenode.component';
import { TreeModel } from './models/tree-model';

@NgModule({
  declarations: [
    AppComponent,
    TreeComponent,
    TreenodeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    TreeModel
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
