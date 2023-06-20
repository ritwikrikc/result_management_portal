import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-login',
  templateUrl: './teacher-login.component.html',
  styleUrls: ['./teacher-login.component.css']
})
export class TeacherLoginComponent implements OnInit {

  /** login formcontrol fields */
  emailFormControl = new FormControl('', [Validators.email, Validators.required]);
  passwordFormControl = new FormControl('', Validators.required);

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * login teacher with email and password 
   * test email: t01@g.com; password
   */
  teacherLogin(){
    console.log("emailFormControl called", this.emailFormControl?.value);
    console.log("passwordFormControl called", this.passwordFormControl?.value);
    // this.router.navigate(['/home']);
  }
}
