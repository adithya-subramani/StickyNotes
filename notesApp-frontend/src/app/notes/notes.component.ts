import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestService } from '../rest.service'

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  constructor(private noteservice:NotesService,private rest:RestService,private router:Router) { }
  notes!:any[];
  err!:any;

  blankNote:boolean=false;
  selTitle!:string;
  selContent!:string;
  colArr:string[]=["aquamarine","aqua","antiquewhite","bisque","lavender"]

  randomColor(id:number):string{
    return this.colArr[id%this.colArr.length];
  }

  noteDetails:any={'id':0,'notetitle':"",'notecontent':"",'owner':this.rest.getUser()};
  selected:boolean=false;
  newNote:boolean=false;

  selectNote(sid:number,nt:string,nc:string){
    this.noteDetails.id=sid;
    this.noteDetails.notetitle=nt;
    this.noteDetails.notecontent=nc;
    this.selected=true;
  }

  backToAll(eve:boolean){
    if(!this.rest.getUser() || this.rest.getUser()==="") this.router.navigate(['/login']);
    this.selected=false;
    this.newNote=false;
    this.noteDetails={'id':0,'notetitle':"",'notecontent':"",'owner':this.rest.getUser()};
    this.noteservice.getNotes(this.rest.getUser()).subscribe({
      next:(data)=>{this.notes=data,console.log(data),console.log(this.notes),this.noteDetails.id=this.notes.length+1,
        console.log(this.noteDetails.id),this.blankNote=(this.noteDetails.id<=1)},
      error:(err)=>this.err=err
    })
  }
  addNote(){
    this.newNote=true;
    this.selected=true;
  }
  logOut(){
    this.rest.removeUser();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    if(!this.rest.getUser() || this.rest.getUser()==="") this.router.navigate(['/login']);
    this.selected=false;
    this.newNote=false;
    this.noteDetails={'id':0,'notetitle':"",'notecontent':"",'owner':this.rest.getUser()};
    this.noteservice.getNotes(this.rest.getUser()).subscribe({
      next:(data)=>{this.notes=data,console.log(data),console.log(this.notes),this.noteDetails.id=this.notes.length+1,
        console.log(this.noteDetails.id),this.blankNote=(this.noteDetails.id<=1)},
      error:(err)=>this.err=err
    })
  }
}
