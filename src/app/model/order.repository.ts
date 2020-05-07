import { Observable } from 'rxjs';
import { Order } from './order.model';
import { StaticDataSource } from './static.datasource';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderRepository {
  private orders: Order[] = [];

  constructor(private dataSource: StaticDataSource) { }

  public getOrders(): Order[] {
    return this.orders;
  }

  public saveOrder(orders: Order): Observable<Order> {
    return this.dataSource.saveOrder(orders);
  }
}
