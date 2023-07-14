import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { STUDENTS } from '../mock-student';
import { Student } from '../student';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  REST_API_HOST: string = 'http://localhost:8000';

  httpHeader = new HttpHeaders().set('content-type', 'application/json');

  constructor(private httpClient: HttpClient) {}

  getStudents(): Observable<Student[]> {
    // const students = of(STUDENTS);
    const getStudentUrl = `${this.REST_API_HOST}/api/student/list`;
    const students =  this.httpClient.get<Student[]>(getStudentUrl);
    return students;
  }

  getStudent(roll_no: string): Observable<Student> {
    const student = STUDENTS.find((student) => student?.roll_no === roll_no)!;
    return of(student);
  }

  addStudent(studentData: Student) {
    const addStudentUrl: string = `${this.REST_API_HOST}/api/student/add`;
    const body = studentData;
    return this.httpClient.post(addStudentUrl, body, {
      headers: this.httpHeader,
    });
  }
}
