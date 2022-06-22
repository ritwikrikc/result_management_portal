import { Component, Input, OnInit } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../services/student.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {

  student?: Student;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getStudent();
  }

  getStudent(): void{
    const roll_no = Number(this.route.snapshot.paramMap.get('roll_no'));
    this.studentService.getStudent(roll_no).subscribe(student => this.student = student)
  }

  goBack(): void {
    this.location.back();
  }

}
