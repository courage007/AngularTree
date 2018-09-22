import { EventEmitter } from '@angular/core';
export interface ITreeNodeContent {
    displayData: any;
    rightMenuClicked?: EventEmitter<any>;
}
