import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Member} from './model/member';
import { Observable } from 'rxjs';
import { Team } from './model/team';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  api = 'http://localhost:8000/api';
  username: string;
  editMemberId: number|any;
  
  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean{
    return this.username != null && this.username.length > 1 ;
  }

  // Returns all members
  getMembers(): Observable<Member[]|any> {
    return this.http
      .get(`${this.api}/members`)
      .pipe(catchError(this.handleError));
  }

  getMember(id: number) : Observable<Member|any>{
    return this.http
      .get(`${this.api}/member/${id}`)
      .pipe(catchError(this.handleError));
  }

  setUsername(name: string): void {
    this.username = name;
  }

  addMember(memberForm: Member) {
    return this.http
        .post(`${this.api}/addMember`, memberForm)
        .pipe(catchError(this.handleError));
  }

  getTeams(): Observable<Team[]|any>{
    return this.http
        .get(`${this.api}/teams`)
        .pipe(catchError(this.handleError));
  }

  deleteMember(id: number) {
    return this.http
        .delete(`${this.api}/deleteMember/${id}`)
        .pipe(catchError(this.handleError));
  }

  updateMember(id: number, memberForm) {
    return this.http
        .put(`${this.api}/updateMember/${id}`, memberForm)
        .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return [];
  }
}
