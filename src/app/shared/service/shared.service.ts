import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user.component';
import * as GlobalConf from 'src/app/shared/config/global';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  
  private USER_ROLE:string = '';
  protected user: User = new User();

  constructor() { }

  setUserRole(user: User): void{
    this.user = user;
    if(user.username === GlobalConf.USER_ROLE_ADMIN && user.password === GlobalConf.USER_ROLE_ADMIN) {
      this.user.role = GlobalConf.USER_ROLE_ADMIN;
    } else {
      this.user.role = GlobalConf.USER_ROLE_USER;
    }
  }

  getUser(): User{
    return this.user;
  }
  
}
