import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http:HttpClient) { }

  getNotes(un:string):Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:3000/getnotes/${un}`);
  }

  addNote(note:any):Observable<any>{
    const options=new HttpHeaders({'Content-Type':'application/json'})
    console.log(note);
    return this.http.post('http://localhost:3000/addnote',
    note,{headers:options}).pipe(tap((data: any) => console.log('Data Fetched:' + JSON.stringify(data))));
  }

  updateNote(note:any):Observable<any[]>{
    const options=new HttpHeaders({'Content-Type':'application/json'})
    console.log(note);
    return this.http.put<any[]>(`http://localhost:3000/updatenote/${note.id}`,
    note,{headers:options}).pipe(tap((data: any) => console.log('Data Fetched:' + JSON.stringify(data))));
  }

  deleteNote(pid:number):Observable<any[]>{
    console.log(pid);
    return this.http.delete<any[]>(`http://localhost:3000/deletenote/${pid}`).pipe(tap((data: any) => console.log('Data Fetched:' + JSON.stringify(data))));
  }
}
