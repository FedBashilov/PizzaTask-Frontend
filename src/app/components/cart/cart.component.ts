import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Subscription } from "rxjs";

import { CartService } from '../../services/cart.service';
import { ApiService } from '../../services/api.service';
import { Order } from '../../models/order.model';
import { CartItem } from '../../models/cart-item.model';
import { OrderProduct } from '../../models/order-product.model';

import { SuccessfulOrderDialogComponent } from '../successful-order-dialog/successful-order-dialog.component';

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
  public delivery: number = 3;

  constructor(private apiService: ApiService, public cartService: CartService, private fb: FormBuilder, public dialog: MatDialog ) {
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
    address: ['',[
      Validators.required
    ]
  ]
  });
}

  isControlInvalid(controlName: string): boolean {
    const control = this.orderForm.controls[controlName];

    const result = control.invalid && control.touched;

    return result;
  }

  onSubmit() {
    const controls = this.orderForm.controls;
    if (this.orderForm.invalid) {
      Object.keys(controls)
       .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    let order: Order = new Order;
    order.client_name = this.orderForm.value.name;
    order.client_phone = this.orderForm.value.phone;
    order.client_address = this.orderForm.value.address;

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
      //  this.openDialog(newOrderId);
    });
    this.showOrHideOrderForm();
    this.initForm();
    this.openDialog(23);
   }

  openDialog(newOrderId: number): void {
    const dialogRef = this.dialog.open(SuccessfulOrderDialogComponent, {
      width: 'auto', height: 'auto',
      data: {newOrderId: newOrderId}
    });


  }


 showOrHideOrderForm(){
   let movingOrderForm: any = document.getElementsByClassName("moving_order_form")[0];
   let mainCart: any = document.getElementsByClassName("main_cart")[0];
   let curtain: any = document.getElementsByClassName("curtain")[0];

   if(movingOrderForm.classList.contains("show")){
     movingOrderForm.classList.remove("show");
     mainCart.classList.remove("active");
     curtain.classList.remove("on");
     curtain.classList.add("off");
   } else {
     movingOrderForm.classList.add("show");
     mainCart.classList.add("active");
     curtain.classList.remove("off");
     curtain.classList.add("on");

     this.products = this.cartService.getItems();
     this.totalPrice = this.cartService.getTotalPrice()+this.delivery;
     //this.cartCounter = this.cartService.getItems();
   }

 }

}
