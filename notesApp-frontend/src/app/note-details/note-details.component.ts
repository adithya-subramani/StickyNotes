import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
import { NotesService } from '../notes.service';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.css']
})
export class NoteDetailsComponent implements OnInit {

  constructor(private noteService:NotesService,private rest:RestService,private router:Router) { }
  @Input() passedDet:any={'id':0,'notetitle':"",'notecontent':"",'owner':this.rest.getUser()};
  @Input() isNew:boolean=false;
  @Output() backEvent = new EventEmitter<boolean>();
  err!:any;

  updateNote(nott:string,notc:string){
    this.passedDet.notetitle=nott;
    this.passedDet.notecontent=notc;
    if(!this.isNew){
      this.noteService.updateNote({
        id:this.passedDet.id,
        notetitle:this.passedDet.notetitle,
        notecontent:this.passedDet.notecontent,
        owner:this.passedDet.owner
      }).subscribe();
    }
    else{
      this.noteService.addNote({
        id: Math.floor(Math.random() * 1340) + 113,
        notetitle:this.passedDet.notetitle,
        notecontent:this.passedDet.notecontent,
        owner:this.passedDet.owner
      }).subscribe();
    }
    this.backEvent.emit(true);
  }
  deleteNote(){
    this.noteService.deleteNote(this.passedDet.id).subscribe();
    this.backEvent.emit(true);
  }
  exitNote(){
    this.backEvent.emit(true);
  }
  ngOnInit(): void {
  }

}
