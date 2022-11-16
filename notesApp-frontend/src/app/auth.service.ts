import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { RestService } from './rest.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient,private rest:RestService) { }
  currURL:string=this.rest.getCurrUrl();
  getUsers():Observable<any[]>{
    return this.http.get<any[]>(this.currURL+'/getusers');
  }

  addUser(user:any):Observable<any>{
    const options=new HttpHeaders({'Content-Type':'application/json'})
    console.log(user);
    return this.http.post(this.currURL+'/adduser',
    user,{headers:options}).pipe(tap((data: any) => console.log('Data Fetched:' + JSON.stringify(data))));
  }

}