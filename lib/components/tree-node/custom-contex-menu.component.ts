import { Component, Input, Output, EventEmitter, OnInit, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';

@Component({
  selector: 'custom-context-menu',
  template: `
  <context-menu #contextmenu>
    <ng-template contextMenuItem (execute)="showMessage('Hi, ' + $event.item.name); go($event.item)">
      Go!
    </ng-template>
    <ng-template contextMenuItem divider="true" role="separator" ></ng-template>
    <ng-template contextMenuItem let-item (execute)="showMessage($event.item.name + ' said: ' + $event.item.otherProperty)">
      Bye, {{item?.name}}
    </ng-template>
  </context-menu>
  `,
  styles:[`
  .custom-context-menu:hover {
    background:rgb(0, 218, 167)
  }
  `]
})


export class CustomContexMenuComponent implements OnInit {
  testData = 'custom contextMenu test';

  ngOnInit() {

  }
    
  public items: any[] = [{
    name: 'One',
    url: '/one',
  }, {
    name: 'Two',
    url: '/two',
  }];

  showMessage(message: any) {
    console.log(message);
  }

  go(item: any) {
    // this.router.navigateByUrl(item.url);
  }

}
