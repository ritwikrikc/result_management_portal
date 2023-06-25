import { Component, OnInit } from '@angular/core';
import { STUDENTS } from '../mock-student';
import { Student } from '../student';
import { StudentService } from '../services/student.service';
import { TeacherService } from '../services/teacher.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  students: Student[] = [];
  username: string = '';
  redirectToTeacherLogin: string = '/teacher/login';

  constructor(private studentService: StudentService, private teacherService: TeacherService, private router: Router) { }

  get isTeacherLogin(): boolean {
    return this.teacherService.isLoggedIn;
  }

  ngOnInit(): void {
    if(this.isTeacherLogin){
      this.username = this.teacherService.getLoggedInUsername;
    }
    this.getStudents();
  }

  getStudents(): void{
    this.studentService.getStudents().subscribe(students => this.students = students);
  }

  logoutTeacher(): void {
    this.teacherService.logout();
    alert("Logout Successfull");
    this.router.navigate([this.redirectToTeacherLogin]);
  }
}
