import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private apiService: ApiserviceService,private router:Router,
    private route: ActivatedRoute, private formBuilder: FormBuilder) {

  }

  PAT_EMAIL = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$";
  PAT_NAME = "^[a-zA-Z ]{2,20}$";

  ngOnInit(): void {
    this.resetForm()
    let id = this.route.snapshot.params['id']
    console.log(id)
    this.getProfileData(`profile/${id}`)
  }

  userProfileForm!: FormGroup
  resetForm() {
    this.userProfileForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.PAT_EMAIL)]],
      firstName: ['', [Validators.required, Validators.pattern(this.PAT_NAME)]],
      lastName: ['', [Validators.required, Validators.pattern(this.PAT_NAME)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  bindForm(data: any) {
    this.userProfileForm.patchValue({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password
    })
  }


  getProfileData(url: string) {
    this.apiService.get(url).subscribe(data => {
      this.bindForm(data)
    })
  }

  onSubmit(){
    this.apiService.put(`profile/${this.route.snapshot.params['id']}`,this.userProfileForm.value).subscribe((data:any)=>{
      this.router.navigateByUrl('users')
    })
  }

}
