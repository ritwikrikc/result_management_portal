import { Component, OnInit } from '@angular/core';
import { STUDENTS } from '../mock-student';
import { Student } from '../student';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  students: Student[] = [];

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void{
    this.studentService.getStudents().subscribe(students => this.students = students);
  }

}
