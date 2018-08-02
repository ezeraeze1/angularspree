import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Order } from '../../core/models/order';
import { User } from '../../core/models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }

  /**
   *
   *
   * @returns {Observable<Order[]>}
   *
   * @memberof UserService
   */
  getOrders(email, page): Observable<Array<Order>> {
    return this.http.get<Array<Order>>(`/api/v1/orders.json?q[email_cont]=${email}&per_page=10&q[s]=id%20desc&page=${page}`)
      .pipe(
        map(data => data)
      )
  }

  /**
   *
   *
   * @param {string} orderNumber
   * @returns {Observable<Order>}
   *
   * @memberof UserService
   */
  getOrderDetail(orderNumber: string): Observable<Order> {
    return this.http.get<Order>(`api/v1/orders/${orderNumber}`)
  }

  /**
   *
   *
   * @returns {Observable<User>}
   *
   * @memberof UserService
   */
  getUser(): Observable<User> {
    const user_id = isPlatformBrowser(this.platformId) ? JSON.parse(localStorage.getItem('user')).id : null;
    return this.http.get<User>(`api/v1/users/${user_id}`);
  }

}
