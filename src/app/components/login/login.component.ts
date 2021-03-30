import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user.component';
import { LoginService } from 'src/app/shared/service/login.service';
import { SharedService } from 'src/app/shared/service/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user!: User;
  userList!: User[];

  constructor( private route: ActivatedRoute, private router: Router , private loginService: LoginService, private sharedService: SharedService) { 
    this.user = new User();
  }

  ngOnInit(): void {
  }

  login():void {
    this.loginService.login(this.user).subscribe(queriedItems => {
      this.userList = queriedItems;
      if(this.userList.length == 1 && this.userList[0] != null){
        console.log(this.userList);
        //this.sharedService.setUserRole(this.userList.shift());
        this.setUser(this.userList[0]);
        this.router.navigate(['/layout']);
      }
    });
    
    //this.router.navigate(['/layout/admin']);
  }

  setUser(user: User) {
    this.user = user;
  }

  signup(): void{
    console.log(this.user);
    this.loginService.signup(this.user);
  }
}
