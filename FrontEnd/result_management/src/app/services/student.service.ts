import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { STUDENTS } from '../mock-student';
import { Student } from '../student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor() { }

  getStudents(): Observable<Student[]> {
    const students = of(STUDENTS);
    return students;
  }

  getStudent(roll_no: Number): Observable<Student>{
    const student = STUDENTS.find( student => student.roll_no === roll_no)!;
    return of(student);
  }
}
