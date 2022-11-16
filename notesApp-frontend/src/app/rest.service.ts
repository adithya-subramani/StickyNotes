import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  constructor() { }
  setUser(user:string){
    localStorage.setItem('user',user);
  }
  getUser():string
  {
    let user:any=localStorage.getItem('user');
    return user;
  }
  removeUser(){
    localStorage.setItem('user',"");
  }
}