import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormGroupDirective, NgForm, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  changePassowrdForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required]),
    OldPassword: new FormControl('',[Validators.required]),
    confirmPassword: new FormControl('', [Validators.required],)
  });
  constructor( private formBuilder: FormBuilder) { }

  ngOnInit() {
    
    this.changePassowrdForm = this.formBuilder.group({
      OldPassword: ['', [Validators.required]],
    password: new FormControl('', [Validators.required]),
    confirmPassword: ['', Validators.required],
    
      
    },
     {
      validator: this.MustMatch('password', 'confirmPassword')
  }
    );
    
  }

  // match passowrd
 MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }

}

}
