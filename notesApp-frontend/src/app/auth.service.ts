import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  getUsers():Observable<any[]>{
    return this.http.get<any[]>('http://localhost:3000/getusers');
  }

  addUser(user:any):Observable<any>{
    const options=new HttpHeaders({'Content-Type':'application/json'})
    console.log(user);
    return this.http.post('http://localhost:3000/adduser',
    user,{headers:options}).pipe(tap((data: any) => console.log('Data Fetched:' + JSON.stringify(data))));
  }

}