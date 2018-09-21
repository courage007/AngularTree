import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TreeModule } from 'ng2tree-common';
import { TreeModule as AngularTreeModule} from 'angular-tree-component';
import { TreeDraggedElement } from 'angular-tree-component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AngularTreeModule,
    TreeModule,
    BrowserModule
  ],
  providers: [
    TreeDraggedElement
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
  ]
})
export class AppModule { }
