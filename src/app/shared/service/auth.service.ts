import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User | null = new User();

  constructor() { }

  isAuthorized(): Boolean{
    return true;
  }

  hasRole(): Boolean{
    return this.isAuthorized();
  }

  logout(): void{
    this.user = null;
  }

}
