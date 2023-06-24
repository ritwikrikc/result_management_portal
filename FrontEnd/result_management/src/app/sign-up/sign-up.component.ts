import { Component, OnInit } from '@angular/core';
import { FormControl, Validators  } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  /* signup formcontrol fields */
  
    firstName= new FormControl('');
    lastName= new FormControl('');
    emailFormControl = new FormControl('', [Validators.email, Validators.required]);
    passwordFormControl = new FormControl('', Validators.required);
  

  constructor() { }

  ngOnInit(): void {
  }


   /*
   * signup teacher with name, email and password 
   */
   teacherSignup(){
    console.log("firstName update", this.firstName?.value);
    console.log("LastName update", this.lastName?.value);
    console.log("emailFormControl update", this.emailFormControl?.value);
    console.log("passwordFormControl update", this.passwordFormControl?.value);
    
  }

}
