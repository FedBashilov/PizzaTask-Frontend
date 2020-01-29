import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from "rxjs";

import { CartService } from '../../services/cart.service';
import { ApiService } from '../../services/api.service';
import { Order } from '../../models/order.model';
import { CartItem } from '../../models/cart-item.model';
import { OrderProduct } from '../../models/order-product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  orderForm: FormGroup;
  private subscription: Subscription;
  public products = [];
  public cartCounter: number;

  constructor(private apiService: ApiService, private cartService: CartService, private fb: FormBuilder ) {
    this.subscription=this.cartService.cartCounter.subscribe(cartCounter => { this.cartCounter = cartCounter; });
  }

  ngOnInit() {
    this.initForm();
 }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  initForm(){
   this.orderForm = this.fb.group({
    name: ['Иван'],
    phone: ['+7'],
    email: [null],
    address: [null],
    comment: [null]
   });
  }

  onSubmit() {
  //const controls = this.orderForm.controls;

   /** Проверяем форму на валидность */
   //if (this.orderForm.invalid) {
    /** Если форма не валидна, то помечаем все контролы как touched*/
  //  Object.keys(controls)
  //   .forEach(controlName => controls[controlName].markAsTouched());

     /** Прерываем выполнение метода*/
  //   return;
  //  }

   /** TODO: Обработка данных формы */

   let order: Order = new Order;
   order.client_name = this.orderForm.value.name;
   order.client_phone = this.orderForm.value.phone;
   order.client_email = this.orderForm.value.email;
   order.client_address = this.orderForm.value.address;
   order.client_comment = this.orderForm.value.comment;

   let cartItems: Array<CartItem> = this.cartService.getItems();
   for(let i=0; i<cartItems.length; i++){
     order.products[i] = new OrderProduct;
     order.products[i].id = cartItems[i].id;
     order.products[i].amount = cartItems[i].amount;
   }

   console.log(order);
   this.apiService.postOrder(order).subscribe();
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
