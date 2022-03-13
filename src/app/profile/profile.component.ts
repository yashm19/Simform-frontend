import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private apiService: ApiserviceService,
    private route: ActivatedRoute, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.resetForm()
    let id = this.route.snapshot.params['id']
    console.log(id)
    this.getProfileData(`profile/${id}`)
  }

  userProfileForm!: FormGroup
  resetForm() {
    this.userProfileForm = this.formBuilder.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
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
    console.log(this.userProfileForm.value)
  }

}
