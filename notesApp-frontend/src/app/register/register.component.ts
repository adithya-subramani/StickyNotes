import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private rest:RestService,private router:Router,
    private formBuilder: FormBuilder,private auth:AuthService) { }
  
  public users!:any[];
  u_id:number=0;
  err!:any;

  regForm!: FormGroup;
  isLoggedIn:boolean=false;
  loginFail:boolean=false;
  nonUniq:boolean=false;
  userN!:string;

  regSub(n:string,un:string,pw:string){
    if(this.u_id!=0){
      for(let i=0;i<this.users.length && this.u_id!=0 ;i++){
          if(this.users[i].username===un){
            this.nonUniq=true;
            break;
          }
      }
    }
    if(this.nonUniq==false){
      this.auth.addUser({
        id:this.u_id,
        name:n,
        username:un,
        password:pw
      }).subscribe();
      this.rest.setUser(un);
      this.router.navigate(['/notes']);
    }
  }

  ngOnInit(): void {
    if(this.rest.getUser() && this.rest.getUser()!="") this.router.navigate(['/notes']);
    else{
      this.regForm = this.formBuilder.group({
        name: ['', Validators.required],
        userName: ['', Validators.required],
        passWord: ['', Validators.required]
      });
      this.auth.getUsers().subscribe({
        next:(data)=>{this.users=data,this.u_id=this.users.length+1},
        error:(err)=>this.err=err
      })
    }
  }

}
