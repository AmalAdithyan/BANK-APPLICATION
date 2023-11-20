import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { DataService } from '../services/data.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //acno='' // or accno:any
  //psw=''
  data = "Your Perfect Banking Partner"
  inputplaceholder = "Account Number"



  constructor(private router: Router, private ds: DataService, private fb: FormBuilder) { }
  loginForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]+')]]
  })
  ngOnInit(): void {
                                                         
  }
  login() {
    var acnum = this.loginForm.value.acno; // Use username as input
    var psw = this.loginForm.value.psw;
    if (this.loginForm.valid) {
      this.ds.login(acnum, psw).subscribe((result: any) => {
        localStorage.setItem("currentUser", JSON.stringify(result.currentUser))
        localStorage.setItem("currentAcno", JSON.stringify(result.currentAcno))
        localStorage.setItem("token", JSON.stringify(result.token))

        alert(result.message)
        this.router.navigateByUrl('dashboard')
      },
        result => {
          alert(result.error.message)
        })
    }

    else {
      alert('invalid form')
    }
  }
}