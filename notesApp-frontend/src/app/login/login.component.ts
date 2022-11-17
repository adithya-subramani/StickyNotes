import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService,private rest:RestService,
    private router:Router,private formBuilder: FormBuilder) { }

  public users:any[]=[];
  err!:any;

  loginForm!: FormGroup;
  isLoggedIn:boolean=false;
  loginFail:boolean=false;
  userN!:string;

  logSubmit(un:string,pw:string){
    for(let i=0;i<this.users.length;i++){
      if(this.users[i].username===un && this.users[i].password===pw){
        this.isLoggedIn=true;
        this.userN=un;
        this.rest.setUser(un);
        this.router.navigate(['/notes']);
        break;
      }
    }
    if(this.isLoggedIn==false){
      this.loginFail=true;
    }
  }

  ngOnInit(): void {
    if(this.rest.getUser() && this.rest.getUser()!="") this.router.navigate(['/notes']);
    else{
      this.loginForm = this.formBuilder.group({
        userName: ['', Validators.required],
        passWord: ['', Validators.required]
      });
      this.auth.getUsers().subscribe({
        next:(data)=>this.users=data,
        error:(err)=>this.err=err
      })
    }
  }

}
