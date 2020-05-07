import { Component } from '@angular/core';
import { NgForm } from '@Angular/forms';
import { OrderRepository } from '../model/order.repository';
import { Order } from '../model/order.model';

@Component({
  moduleId: module.id,
  templateUrl: 'checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent {
  public orderSent = false;
  public submitted = false;

  constructor(public repository: OrderRepository,
              public order: Order) { }

  submitOrder(form: NgForm): void {
    this.submitted = true;
    if (form.valid) {
      this.repository
          .saveOrder(this.order)
          .subscribe(order => {
            this.order.clear();
            this.orderSent = true;
            this.submitted = false;
          });
    }
  }
}
