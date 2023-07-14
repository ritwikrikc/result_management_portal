import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { Student } from '../student';
import { map } from 'rxjs';

@Component({
  selector: 'app-add-edit-student',
  templateUrl: './add-edit-student.component.html',
  styleUrls: ['./add-edit-student.component.css'],
})
export class AddEditStudentComponent implements OnInit {
  redirectToTeacherDashboard: string = '/teacher/dashboard';
  /* signup formcontrol fields */

  student_name = new FormControl('', Validators.required);
  roll_number = new FormControl('', Validators.required);
  total_marks = new FormControl('', Validators.required);
  marks = new FormControl('', Validators.required);
  result_status = new FormControl('', Validators.required);
  emailFormControl = new FormControl('', [
    Validators.email,
    Validators.required,
  ]);
  constructor(private router: Router, private studentService: StudentService) {}

  ngOnInit(): void {}

  get getStudentFormData() {
    const formData: Student = {
      name: this.student_name?.value,
      roll_no: this.roll_number?.value,
      total_marks: this.total_marks?.value,
      marks: this.marks?.value,
      result_status: this.result_status?.value,
      email: this.emailFormControl?.value,
    };
    return formData;
  }

  addStudent() {
    if (this.isAddStudentFormValid()) {
      this.studentService
        .addStudent(this.getStudentFormData)
        .pipe(
          map((res: any) => {
            return res || {};
          })
        )
        .subscribe({
          next: (res) => {
            alert(`successfully student added !`);
            this.router.navigate([this.redirectToTeacherDashboard]);
          },
          error: (e) => {
            console.log(JSON.stringify(e));
            alert(`add student Unsuccessfull !`);
          },
        });
    } else {
      alert('Student details not valid !');
    }
  }

  isAddStudentFormValid(): boolean {

    // Todo: add validation for duplicate email and roll number

    return (
      this.student_name.valid &&
      this.roll_number.valid &&
      this.total_marks.valid &&
      this.marks.valid &&
      this.result_status.valid &&
      this.emailFormControl.valid
    );
  }
}
