import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { MenuItem } from '../../models/menu-item';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html'
})
export class MenuListComponent implements OnInit {
  fullMenu: MenuItem[] = [];
  filteredMenu: MenuItem[] = [];
  categories: string[] = ['All', 'Starters', 'Main Course', 'Pizza', 'Burgers', 'Desserts', 'Drinks'];
  selectedCategory: string = 'All';

  constructor(public cartService: CartService) {} 

  ngOnInit() {
    fetch('assets/data.json')
      .then(res => res.json())
      .then(data => {
        this.fullMenu = data.menu;
        this.filteredMenu = data.menu;
      });
  }

  filterByCategory(cat: string) {
    this.selectedCategory = cat;
    this.filteredMenu = (cat === 'All') 
      ? this.fullMenu 
      : this.fullMenu.filter(item => item.category === cat);
  }

  addToCart(item: MenuItem) {
    this.cartService.addItem(item);
  }
}