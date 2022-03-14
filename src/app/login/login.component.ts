import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string | undefined;
  showErrorMsg: boolean = false
  errorMessage: string = ''


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiserviceService
  ) {
  }

  ngOnInit() {
    this.showErrorMsg = false
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }


  //on submit of login button
  onSubmit() {
    this.apiService.post('auth/login', this.loginForm.value).subscribe((data: any) => {
      console.log(data)
      this.apiService.setToken(data.token)
      this.router.navigateByUrl('users')
    }, (error) => {
      this.showErrorMsg = true
      this.errorMessage = error?.error?.message
    })
  }
}
