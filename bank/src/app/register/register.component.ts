import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router'
import { FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //CREATE REACTIVE FORM OF REGISTER FORM

  constructor(private ds: DataService, private router: Router,private fb:FormBuilder) { } //here inside constructor what we are doing is DEPENDENCY INJECTION TO ACCESS DATA FROM DATA SERVICES
  //TO DO THAT TYPE PRIVATE/PUBLIC(YOUR PREFERENCE THEN ADD REFERENCE NAME(HERE IT IS DS) THEN (COLON:) 
  //THENFROM WHERE YOU NEED DATA FROM THAT COMPONENTS CLASS NAME(HERE DataServices)
  registerForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]+')]],
    uname:['',[Validators.required,Validators.pattern('[A-Z]+')]],
    psw:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]+')]]
  })
  ngOnInit(): void {

  }
  register() {
    var uname = this.registerForm.value.uname
    var acno = this.registerForm.value.acno
    var psw = this.registerForm.value.psw
    
    if(this.registerForm.valid){
    this.ds.register(uname, acno, psw).subscribe((result:any)=>{
      alert(result.message)
this.router.navigateByUrl("")
      },
      result=>{
        alert(result.error.message)
        this.router.navigateByUrl("")
      })
      
    }
    
else{
  alert('invalid form')
}
}
}// ivide CONST RESULT ILE ATHINDE OUTPUT STORE AVUM.BUT IVIDE LABIKKUNA OUTPUT DATA.SERVICE.TSile IF INIE AKATHULLA RETURN VALUE AYA TRUE ALLNKIL FALSE ANU
