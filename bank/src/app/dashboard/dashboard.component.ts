import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any
  acno: any
  datedetails: any
  constructor(private ds: DataService, private fb: FormBuilder, private router: Router) {
    this.datedetails = new Date
    if(localStorage.getItem("currentUser")){
      this.user=JSON.parse(localStorage.getItem("currentUser") || "")
    }

  }
  depositForm = this.fb.group({

    acno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    amnt: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]+')]]
  })
  withdrawForm = this.fb.group({

    acno1: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    amnt1: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw1: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]+')]],
  })
  ngOnInit(): void {
    if(!localStorage.getItem("token")){
    alert("Please Login First")
    this.router.navigateByUrl("")
    }
  }
  deposit() {
    var acno = this.depositForm.value.acno
    var psw = this.depositForm.value.psw
    var amnt = this.depositForm.value.amnt
    if (this.depositForm.valid) {
      this.ds.deposit(acno, psw, amnt).subscribe((result: any) => {
        alert(result.message)
      },
        result => {
          alert(result.error.message)
        }
        )
    }
    else {
      alert('invalid form')
    }
  }
  withdraw() {
    var acno = this.withdrawForm.value.acno1
    var psw = this.withdrawForm.value.psw1
    var amnt = this.withdrawForm.value.amnt1

    if (this.withdrawForm.valid) {
      this.ds.withdraw(acno, psw, amnt).subscribe((result: any) => {
        alert(result.message)
      },
        result => {
          alert(result.error.message)
        }
      )
    }

    else {
      alert('invalid form')
    }
  }

  logout() {
    localStorage.removeItem("currentUser")
    localStorage.removeItem("currentAcno")
    localStorage.removeItem("token")
    this.router.navigateByUrl("")
  }
  deleteParent() {
    this.acno = JSON.parse(localStorage.getItem("currentAcno") || "")
  }
  cancel() {
    this.acno = ''
  }
Delete(event:any){
  //alert(event)
this.ds.deleacc(event).subscribe((result:any)=>{
  alert(result.message)
  this.logout()
  this.router.navigateByUrl("")
})
}
}
