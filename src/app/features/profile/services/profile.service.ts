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
/**
 * Service responsible for managing user profile data and order history.
 * Handles local storage operations for user profile information and previous orders.
 *
 * Features:
 * - User profile data management (CRUD operations)
 * - Order history tracking
 * - Local storage persistence
 * - Current user session management
 */
export class ProfileService {
  constructor() {}

  /**
   * Retrieves the current user's ID from local storage
   * @returns number The current user's ID
   */
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
