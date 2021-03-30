import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';
import { SharedService } from 'src/app/shared/service/shared.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private sharedService: SharedService) { }

  ngOnInit(): void {
  }

  get isAuthorized(){
    return this.authService.isAuthorized();
  }

  get isAdmin(){
    return this.authService.hasRole();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getUser() {
    console.log(this.sharedService);
  }

}
