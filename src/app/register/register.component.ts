import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  loading = false;
  submitted = false;
  PAT_EMAIL = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$";
  PAT_NAME = "^[a-zA-Z ]{2,20}$";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiserviceService

  ) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.PAT_EMAIL)]],
      firstName: ['', [Validators.required, Validators.pattern(this.PAT_NAME)]],
      lastName: ['', [Validators.required, Validators.pattern(this.PAT_NAME)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm.valueChanges.subscribe((value) => {
      console.log(this.registerForm)
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.apiService.post('auth/register', this.registerForm.value).subscribe((data) => {
      console.log(data)
      this.router.navigate(['/login'])
    })
  }
}
