import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';

import { Product } from '../../models/product.model';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})



export class ProductListComponent implements OnInit {
	public allProductsId: number[] = [];
	public allProducts: Product[] = [];

	constructor(private apiService: ApiService, private cartService: CartService) { }

	ngOnInit() {
		this.apiService.getAllProductsId().subscribe( (allProductsId: number[]) => {
	  		this.allProductsId = allProductsId;
	  	  this.allProductsId.forEach( (productId)=>{
	  			this.apiService.getProductById(productId).subscribe( (product: Product) => {
	  				this.allProducts.push(product);
	  			});
	  		});
  		});
 }

  addProductToCart(id, name, price){
    //do animation
    console.log(id, name, price);

    this.cartService.addToCart(id, name, price);
  }

}
