import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { User } from 'src/app/model/user.component';
import { map, switchMap } from 'rxjs/operators';
import { LoginService } from 'src/app/shared/service/login.service';
import { Vital } from 'src/app/model/vital.component';
import { VitalService } from 'src/app/shared/service/vital.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/shared/service/auth.service';

// declarables
declare var M: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements AfterViewInit {

  //displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumns: string[] = ['bodyTemperature', 'bodyPressure', 'glucose', 'heartRate', 'respiration', 'oxygenSaturation'];
  dataSource = new MatTableDataSource<Vital>();
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  usersRef:  AngularFireList<User>;
  vitalRef: AngularFireList<Vital>;
  users: any;
  userVitalList!: any;
  vitalDB: AngularFireDatabase;
  userKey!: string;
  vital!: Vital;
  items$!: Observable<any>;
  size$!: BehaviorSubject<string>;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor(db: AngularFireDatabase, private authService: AuthService,
        private loginService: LoginService, private vitalService: VitalService) { 
    this.usersRef = db.list('/user');
    this.vitalRef = db.list('/vital');
    this.vitalDB = db;
    // Use snapshotChanges().map() to store the key
    this.loginService.getAllUsers().snapshotChanges().pipe( map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(data =>{
      this.users = data;
      console.log(">>>>>>>>>>>>>");
      console.log(this.users);
      const elem = document.querySelector('.dropdown-trigger');
      const options= {};
      //M.Tabs.init(elem, options);
      //var elems = document.querySelectorAll('.dropdown-trigger');
      M.Dropdown.init(elem, options);
    });
    this.vital = new Vital();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  get isAdmin(){
    return this.authService.hasRole();
  }

  saveVitalForUser(): void {
    this.vital.userKey = this.userKey;
    this.vital.time = new Date();
    console.log(this.vital);
    this.vitalService.saveVitalForUser(this.vital); 
  }

  getVitalByUser(userKey: string) {
    
    console.log(userKey);
    this.userKey = userKey;
    this.size$ = new BehaviorSubject("");
    this.items$ = this.size$.pipe(
      switchMap(size => 
        this.vitalDB.list('/vital', (ref: any) => ref.orderByChild('userKey').equalTo(userKey)).valueChanges()
      )
    );

    this.items$.subscribe(queriedItems => {
      console.log(queriedItems);  
      this.userVitalList = queriedItems;
      this.dataSource = this.userVitalList;
      let testObj = this.userVitalList.shift();
      //console.log(testObj);
    });

  }

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
