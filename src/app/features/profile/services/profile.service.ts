import { Injectable } from '@angular/core';

import { IUserCartLog } from '../../cart/models/userCartLog.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor() {}

  getCurrentUser(): number {
    let user = JSON.parse(localStorage.getItem(`user`)!);
    return user.userId;
  }

  getPreviousItems(user: number): IUserCartLog[] {
    if (`user#${user} orders` in localStorage) {
      let previousItems = JSON.parse(
        localStorage.getItem(`user#${user} orders`)!
      );
      return previousItems;
    } else {
      alert(`You do not have any previous orders!`);
      return [];
    }
  }
}
