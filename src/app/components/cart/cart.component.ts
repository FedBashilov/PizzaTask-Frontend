import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';

import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public products = [];
  public cartCounter: number;

  constructor( private cartService: CartService ) {
    this.cartService.cartCounter.subscribe(cartCounter => { this.cartCounter = cartCounter; });
  }

  ngOnInit() {
 }


 showOrHideOrderForm(){
   let movingOrderForm: any = document.getElementsByClassName("moving_order_form")[0];
   let curtain: any = document.getElementsByClassName("curtain")[0];

   if(movingOrderForm.classList.contains("show")){
     movingOrderForm.classList.remove("show");
     curtain.classList.remove("on");
     curtain.classList.add("off");
   } else {
     movingOrderForm.classList.add("show");
     curtain.classList.remove("off");
     curtain.classList.add("on");

     this.products = this.cartService.getItems();
     //this.cartCounter = this.cartService.getItems();

     console.log(this.products);

   }

 }

}
