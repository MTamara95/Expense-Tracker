import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, FormControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  registerForm: UntypedFormGroup;

  constructor(private accountService: AccountService, private toastr: ToastrService, private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [
        Validators.required, 
        Validators.minLength(4), 
        Validators.maxLength(16), 
        this.containsUppercase(), 
        this.containsLowercase(),
        this.containsDigit()
      ]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
    })
    this.registerForm.controls.password.valueChanges.subscribe(() => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : { isMatching: true }
    }
  }

  containsUppercase(): ValidatorFn {
    return (control: AbstractControl) => {
      const password = control?.value as string;
  
      if (!password) return null;
      
      const containsUppercaseLetter = /[A-Z]/.test(password);
  
      return containsUppercaseLetter ? null : { noUppercase: true };
    };
  }

  containsLowercase(): ValidatorFn {
    return (control: AbstractControl) => {
      const password = control?.value as string;
  
      if (!password) return null;
      
      const containsLowercaseLetter = /[a-z]/.test(password);
  
      return containsLowercaseLetter ? null : { noLowercase: true };
    };
  }

  containsDigit(): ValidatorFn {
    return (control: AbstractControl) => {
      const password = control?.value as string;
  
      if (!password) return null;
      
      const containsDigit = /[0-9]/.test(password);
  
      return containsDigit ? null : { noDigit: true };
    };
  }

  register() {
    this.accountService.register(this.registerForm.value).subscribe(response => {
      console.log(response);
      this.cancel();
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
