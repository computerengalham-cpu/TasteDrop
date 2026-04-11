import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  orderData = {
    fullName: '',
    email: '',
    address: '',
    city: '',
    paymentMethod: 'card', 
    cardNumber: '',
    expiry: '',
    cvv: ''
  };

  totalAmount: number = 0;

  constructor(public cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.totalAmount = this.cartService.getTotal() + 1.5;
    
    if (this.cartService.getItems().length === 0) {
      this.router.navigate(['/menu']);
    }
  }

  submitOrder() {

    alert('Thank you ' + this.orderData.fullName + '! Your order has been placed successfully.');
   
    this.cartService.clearCart();
    
    this.router.navigate(['/menu']);
  }
}