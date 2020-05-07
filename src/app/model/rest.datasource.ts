import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { Cart } from './cart.model';
import { Order } from './order.model';
import { map } from 'rxjs/operators';

const PROTOCOL = 'http';
const PORT = 3000;

@Injectable()
export class RestDataSource {
  public baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    httpOptions.headers =
      httpOptions.headers.set('Authorization', 'my-new-auth-token');
  }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3500/products') as Observable<Product[]>;
  }

  public saveOrder(order: Order): Observable<Order> {
    return this.http.post<Order>('http://localhost:3500/products',
                                  order,
                                  { headers: { Authorization: 'Bearer<appsekret' } } ) as Observable<Order>;
  }

  // private sendRequest(verb: HttpRequest<any>, url: string, body?: Product | Order): Observable<Product | Order> {
  //     return this.http.request(new Request({
  //       method: verb,
  //       url: this.baseUrl + url,
  //       body,
  //       responseType: 'json'
  //     })).pipe(
  //         map(data => data.json())
  //       )
  // }

}

