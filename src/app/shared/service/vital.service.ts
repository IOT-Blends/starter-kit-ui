import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase, AngularFireAction} from '@angular/fire/database';
import { Vital } from 'src/app/model/vital.component';
import { Subject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VitalService {
  private userDBPath = "/vital";
  vitalRef: AngularFireList<Vital>;
  vitalDB: any;
  
  constructor(private db: AngularFireDatabase) {  
    this.vitalRef = this.db.list(this.userDBPath);
    this.vitalDB = this.db;
  }

  saveVitalForUser(vital: Vital): void{
    this.vitalRef.push(vital);
  }

  getVitalByUser(userKey: string): Observable<any>{
    console.log(userKey);
    const size$ = new Subject<string>();
    const queryObservable = size$.pipe(
      switchMap(size => 
        this.vitalDB.list('vital', (ref: any) => ref.orderByChild('userKey').equalTo(userKey)).valueChanges()
      )
    );
     return queryObservable;
  }

}
