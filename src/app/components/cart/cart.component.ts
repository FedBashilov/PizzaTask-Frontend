import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  public totalPrice: number;

  constructor(private apiService: ApiService, public cartService: CartService, private fb: FormBuilder ) {
    this.subscription = this.cartService.cartCounter.subscribe(cartCounter => { this.cartCounter = cartCounter; });
  }

  ngOnInit() {
    this.initForm();
    this.totalPrice = this.cartService.getTotalPrice();
 }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  initForm(){
   this.orderForm = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.pattern(/^[A-z]+$/)
    ]
  ],
    phone: ['', [
      Validators.required,
      Validators.pattern(/^(\+)?[0123456789]+$/)
    ]
  ],
    email: ['', [
      Validators.email
    ]
  ],
    address: ['',[
      Validators.required
    ]
  ],
    comment: ['']
   });
  }

  isControlInvalid(controlName: string): boolean {
  const control = this.orderForm.controls[controlName];

   const result = control.invalid && control.touched;

   return result;
  }

  onSubmit() {
  const controls = this.orderForm.controls;

   /** Проверяем форму на валидность */
   if (this.orderForm.invalid) {
    /** Если форма не валидна, то помечаем все контролы как touched*/
    Object.keys(controls)
     .forEach(controlName => controls[controlName].markAsTouched());

     /** Прерываем выполнение метода*/
     return;
    }

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
   this.cartService.clearCart();
   this.products=this.cartService.getItems();
   this.totalPrice = this.cartService.getTotalPrice();

   this.apiService.postOrder(order).subscribe( (newOrderId: number) =>{
      alert(newOrderId);
   });

}


 showOrHideOrderForm(){
   let containerOrder: any = document.getElementsByClassName("container_order")[0];
   let mainCart: any = document.getElementsByClassName("main_cart")[0];
   let curtain: any = document.getElementsByClassName("curtain")[0];

   if(containerOrder.classList.contains("show")){
     containerOrder.classList.remove("show");
     mainCart.classList.remove("active");
     curtain.classList.remove("on");
     curtain.classList.add("off");
   } else {
     containerOrder.classList.add("show");
     mainCart.classList.add("active");
     curtain.classList.remove("off");
     curtain.classList.add("on");

     this.products = this.cartService.getItems();
     this.totalPrice = this.cartService.getTotalPrice();
     //this.cartCounter = this.cartService.getItems();
   }

 }

}
