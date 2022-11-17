import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { RestService } from './rest.service'

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http:HttpClient,private rest:RestService) { }
  currURL:string=this.rest.getCurrUrl();

  getNotes(un:string):Observable<any[]>{
    return this.http.get<any[]>(this.currURL+`/db/getnotes/${un}`);
  }

  addNote(note:any):Observable<any>{
    const options=new HttpHeaders({'Content-Type':'application/json'})
    console.log(note);
    return this.http.post(this.currURL+'/db/addnote',
    note,{headers:options}).pipe(tap((data: any) => console.log('Data Fetched:' + JSON.stringify(data))));
  }

  updateNote(note:any):Observable<any[]>{
    const options=new HttpHeaders({'Content-Type':'application/json'})
    console.log(note);
    return this.http.put<any[]>(this.currURL+`/db/updatenote/${note.id}`,
    note,{headers:options}).pipe(tap((data: any) => console.log('Data Fetched:' + JSON.stringify(data))));
  }

  deleteNote(pid:number):Observable<any[]>{
    console.log(pid);
    return this.http.delete<any[]>(this.currURL+`/db/deletenote/${pid}`).pipe(tap((data: any) => console.log('Data Fetched:' + JSON.stringify(data))));
  }
}
