import {OrderProduct} from "./order-product.model";

export class Order{
  public client_name: string = null;
  public client_phone: string = null;
  public client_address: string = null;
  public products: OrderProduct[] = [];

}
