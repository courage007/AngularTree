import { Component, Input } from '@angular/core';
import { TreeNode } from '../../models/tree-node';

@Component({
  selector: 'ng2tree-node-drop-slot',
  templateUrl: './tree-node-drop-slot.component.html',
  styleUrls: ['./tree-node-drop-slot.component.css']
})
export class TreeNodeDropSlotComponent {

  @Input() node: TreeNode;
  @Input() dropIndex: number;

  onDragOver($event) {
    $event.preventDefault();
    this.node.treeModel.setDropLocation({ component: this, parentNode: this.node, index: this.dropIndex });
  }

  onDragLeave() {
    if (this.node.treeModel.isDraggingOver(this)) {
      this.node.treeModel.setDropLocation(null);
    }
  }

  onDrop($event) {
    $event.preventDefault();
    // this.node.mouseAction('drop', $event, { node: this.node, index: this.dropIndex });
    console.log('onDropEvent: tree-node-drop-slot');
    this.node.dropMouseAction($event, {parentNode: this.node, index: this.dropIndex });
  }

}
