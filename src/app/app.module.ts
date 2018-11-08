import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TreeModule } from '../../lib/tree.module';

import { AppComponent } from './app.component';

import { ContextMenuModule, ContextMenuComponent } from 'ngx-contextmenu';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ContextMenuModule.forRoot({
      autoFocus: true,
      // useBootstrap4: true,
    }),
    TreeModule,
    BrowserModule
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
