import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  
import { User } from 'src/app/model/user.component';
import { SharedService } from './shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userDBPath = "/user";
  usersRef!: AngularFireList<User>;
  //userRef!: AngularFireObject<User>;
  public userRole:string = '';
  items$!: Observable<any>;
  size$!: BehaviorSubject<string>;
  userDB: AngularFireDatabase;
  userList!: any;
  
  constructor(private db: AngularFireDatabase, private sharedService: SharedService, private route: ActivatedRoute,
    private router: Router) {
    this.usersRef = this.db.list(this.userDBPath);
    this.userDB = db;
    //this.userRef = this.db.object(this.userDBPath);
  }

  signup(user: User){
    this.usersRef.push(user);
  }

  getAllUsers(): AngularFireList<User>{
    return this.usersRef;
  }

  //getLoggedInUser(user: User): AngularFireObject<User>{
    //return this.userRef.query.equalTo(user.username).;
  //}

  login(user: User): Observable<any> {
    console.log(user);
    this.size$ = new BehaviorSubject("");
    return this.items$ = this.size$.pipe(
      switchMap(size => 
        this.userDB.list('/user', (ref: any) => ref.orderByChild('username').equalTo(user.username) && ref.orderByChild('password').equalTo(user.password)).valueChanges()
      )
    );

    /*this.items$.subscribe(queriedItems => {
      console.log(queriedItems);  
      this.userList = queriedItems;
      return this.userList;
    });*/
  }
}
