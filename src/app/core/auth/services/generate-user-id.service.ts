import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GenerateUserIdService {
  constructor() {}
  stringToHex(userEmail: string): number {
    const name = userEmail.split('@')[0];
    let hex = Array.from(name)
      .map((char) => char.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('')
      .substring(0, 128);
    return parseInt(parseInt(hex, 16).toString().substring(0, 4), 10);
  }
}
