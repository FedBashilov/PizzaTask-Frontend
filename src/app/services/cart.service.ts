import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';

import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items = [];
  
  private cartCounterSubject = new BehaviorSubject<number>(0);
  cartCounter = this.cartCounterSubject.asObservable();
  counter: number = 0;

  addToCart(name, price) {
    this.cartCounterSubject.next(++this.counter);

    for(let i=0; i<this.items.length; i++){
      if(this.items[i].name==name){
        this.items[i].amount++;
        return;
      }
    }

    let newItem: CartItem = new CartItem;
    newItem.name = name;
    newItem.price = price;
    newItem.amount = 1;

    this.items.push(newItem);

  }

  deleteFromCart(name){
    for(let i=0; i<this.items.length; i++){
      if(this.items[i].name==name){
        if(this.items[i].amount>1){
          this.items[i].amount--;
        } else {
          this.items.splice(i,1);
        }
        this.cartCounterSubject.next(--this.counter);
        return;
      }
    }
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
}
