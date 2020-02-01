import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from  'rxjs';

import { Product } from  './../models/product.model';
import { Order } from  './../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public PHP_API_SERVER = "https://pizzatask.000webhostapp.com";

  constructor(private httpClient: HttpClient) {}

  getAllProductsId(): Observable<number[]>{
    return this.httpClient.get<number[]>(`${this.PHP_API_SERVER}/API/products`);
  }

  getProductById(id : number): Observable<Product>{
    return this.httpClient.get<Product>(`${this.PHP_API_SERVER}/API/products/${id}`);
  }

  postOrder(newOrder: Order): Observable<number>{
    return this.httpClient.post<number>(`${this.PHP_API_SERVER}/API/orders`, {data: newOrder} );
  }

}
