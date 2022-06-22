import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import {  SignUpComponent } from './sign-up/sign-up.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'teacher/login', component: TeacherLoginComponent },
  { path: 'teacher/signup', component: SignUpComponent},
  { path: 'teacher', component: TeacherComponent },
  { path: 'student/:roll_no/profile', component: StudentProfileComponent },
]
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
