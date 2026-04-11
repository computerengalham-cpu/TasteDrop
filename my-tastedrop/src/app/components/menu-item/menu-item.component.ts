import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MenuItem } from '../../models/menu-item';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent {

  @Input() item!: MenuItem;
  @Output() addToCart = new EventEmitter<MenuItem>();

  handleAdd() {
    this.addToCart.emit(this.item);
  }
}