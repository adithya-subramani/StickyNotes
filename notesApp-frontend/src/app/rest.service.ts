import { Injectable,isDevMode } from '@angular/core';

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
  getCurrUrl(){
      if (isDevMode()) {
        return 'http://localhost:3000';
      }
      return '';
  }
}