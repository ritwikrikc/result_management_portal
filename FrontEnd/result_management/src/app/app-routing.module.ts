import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import {  SignUpComponent } from './sign-up/sign-up.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { AddEditStudentComponent } from './add-edit-student/add-edit-student.component';
import { StudentLoginComponent } from './student-login/student-login.component';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'teacher/login', component: TeacherLoginComponent },
  { path: 'teacher/signup', component: SignUpComponent},
  { path: 'teacher/dashboard', component: TeacherComponent },
  { path: 'student/:roll_no/profile', component: StudentProfileComponent },
  { path: 'teacher/add-edit-student', component: AddEditStudentComponent },
  { path: 'student/student-login', component: StudentLoginComponent },
  

]
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
