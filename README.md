# Contents
- [Introduction and Feature](#introduction-and-feature)
- [Common Tree Component for Angular 2+](#common-tree-component-for-angular-2+)

# Introduction and Features
Using this Module you can utilize an Angular Tree Component in Angular 2+.
Feel free to contribute, raise feature requests and make it better. Here is the main Feature:
## 1. toggle: expand or collapse
## 2. active: active or deactive
## 3. focuse: focuse or blur 
## 4. keys operations:down | up |  left | right | space | enter
## 5. node operation api: add node | remove node

# Common Tree Component for Angular 2+

## Setup

### Installation

- (1) Install from npm repository:
```
npm install ng2tree-common --save

 ```

### Sample
- (1) Include TreeModule in Main Module where you want to use the tree component.(eg: app.module.ts): 
```typescript
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
```

- (2) Create Editor options in component.(eg: app.component.ts)
```typescript
import { Component } from '@angular/core';

export const DATA = [
  {
    id: 1,
    name: 'root1',
    subTitle: 'the root',
    type: 'type1',
    children: [
        {
            id: 2,
            name: 'child1.1',
            type: 'type2',
            subTitle: 'a good child'
        }
    ]
  },
  {
    id: 3,
    name: 'root3',
    subTitle: 'the third root',
  }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  styles: [
    `button: {
      line - height: 24px;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
      border: none;
      border-radius: 2px;
      background: #A3D9F5;
      cursor: pointer;
      margin: 0 3px;
    }`
  ],
})

export class AppComponent {
  title = 'app';
  nodes = DATA ; // Outside static Data
}

```
- (3) Include editor in html with options and ngModel bindings.(eg: app.component.html)
```html
  <ng2tree [nodes]="nodes"></ng2tree>
```

### Events
Output event (onToggle、onActivate、onDeactivate、onActiveChanged, ...) expose the tree instance that can be used for performing custom operations on it. 
```html
  <ng2tree [nodes]="nodes" (onToggle)="toggleEventHandler($event)" (onActivate)="activateEventHandler($event)"
    (onDeactivate)="deactivateEventHandler($event)" (onActiveChanged)="activeChangedEventHandler($event)"
    (onFocus)="focusEventHandler($event)" (onBlur)="blurEventHandler($event)" (onDoubleClick)="doubleClickEventHandler($event)"
    (onContextMenu)="contextMenuEventHandler($event)"
  ></ng2tree>
```

```typescript
export class AppComponent {
  title = 'app';
  nodes = DATA ; // Outside static Data

  // 自定义事件处理器
  toggleEventHandler = ($event) => console.log($event);
  activateEventHandler = ($event) => console.log($event);
  deactivateEventHandler = ($event) => console.log($event);
  activeChangedEventHandler = ($event) => console.log($event);
  focusEventHandler = ($event) => console.log($event);
  blurEventHandler = ($event) => console.log($event);
  doubleClickEventHandler($event){
    console.log("Double Click Handler. The event is:", $event);
  }
  contextMenuEventHandler = ($event) => console.log("Show ContextMenu:with or without custom contex menu", $event);
}
```

## Configurations
The ng2tree-common exposes api for user to customize his/her config.
- (1) Create tree options in component.(eg: app.component.ts)
```typescript
export class AppComponent {
  nodes = DATA ; // Outside static Data
  
  // Custom Options
  customTemplateStringOptions = {
    allowDrag: false,
    enableCustomContextMenu: false
  }
}

```
- (2) Using your custom options as the ng2tree-common's input.(eg: app.component.html)
```html
 <ng2tree [nodes]="nodes" [options]="customTemplateStringOptions" ></ng2tree>
```

## License

MIT © [John Wang](https://github.com/courage007)
