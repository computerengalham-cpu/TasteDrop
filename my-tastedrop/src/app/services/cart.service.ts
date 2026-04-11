import { Injectable } from '@angular/core';
import { MenuItem } from '../models/menu-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: (MenuItem & { quantity: number })[] = [];

  addItem(item: MenuItem) {
    const existing = this.items.find(i => i.id === item.id);

    if (existing) {
      existing.quantity++;
    } else {
      this.items.push({ ...item, quantity: 1 });
    }
  }

  removeItem(id: number) {
    this.items = this.items.filter(i => i.id !== id);
  }

  getItems() {
    return this.items;
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
  clearCart() {
  this.items = []; 
  return this.items;
}
}
