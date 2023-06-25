import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  REST_API_HOST: string = 'http://localhost:8000';

  httpHeader = new HttpHeaders().set('content-type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  // Login method
  login(formData: any) {
    const teacherLoginUrl: string = `${this.REST_API_HOST}/api/teacher/login`;
    const body = formData;
    return this.httpClient.post('http://localhost:8000/api/teacher/login', body, {
        headers: this.httpHeader
      }
    )
  }

  // register method

  // method to get the status of teacher loged.
  get isLoggedIn(): boolean{
    return !!localStorage.getItem('AUTH_TOKEN');
  }
}
