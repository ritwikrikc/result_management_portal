import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TeacherService } from '../services/teacher.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-teacher-login',
  templateUrl: './teacher-login.component.html',
  styleUrls: ['./teacher-login.component.css'],
})
export class TeacherLoginComponent implements OnInit {

  redirectToTeacherDashboard: string = '/teacher/dashboard';

  /** login formcontrol fields */
  emailFormControl = new FormControl('', [
    Validators.email,
    Validators.required,
  ]);
  passwordFormControl = new FormControl('', Validators.required);

  constructor(private router: Router, private teacherService: TeacherService) {}

  ngOnInit(): void {
    if(this.teacherService.isLoggedIn){
      this.router.navigate([this.redirectToTeacherDashboard]);
    }

    // Todo: show student data on a sorted order by roll no
  }

  /**
   * login teacher with email and password
   * test email: t01@g.com; password
   */
  teacherLogin() {
    const formData = {
      email: this.emailFormControl?.value,
      password: this.passwordFormControl?.value,
    };
    this.teacherService
      .login(JSON.stringify(formData))
      .pipe(
        map((res: any) => {
          return res || {};
        })
      )
      .subscribe({
        next: (res) => {
          localStorage.setItem(
            'AUTH_TOKEN',
            JSON.parse(JSON.stringify(res))['token']
          );
          localStorage.setItem(
            'username',
            this.emailFormControl?.value
          );
          this.router.navigate([this.redirectToTeacherDashboard]);
        },
        error: (e) => {
          console.log(JSON.stringify(e));
          alert(`${JSON.stringify(e)} \n Login Unsuccessfull !`);
          this.emailFormControl.reset;
          this.passwordFormControl.reset;
        },
      });
  }
}
