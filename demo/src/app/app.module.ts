import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TreeModule } from 'ng2tree-common';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    TreeModule,
    BrowserModule
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
  ]
})
export class AppModule { }
