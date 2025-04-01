import { Injectable } from '@angular/core';
import { IUserCartLog } from '../../cart/models/userCartLog.model';

export interface IUserProfile {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

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

  getProfileData(): IUserProfile | null {
    const userId = this.getCurrentUser();
    const profileData = localStorage.getItem(`user#${userId}_profile`);
    return profileData ? JSON.parse(profileData) : null;
  }

  updateProfile(profileData: IUserProfile): void {
    const userId = this.getCurrentUser();
    localStorage.setItem(`user#${userId}_profile`, JSON.stringify(profileData));
  }
}
