
import { animate } from '@angular/animations';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit, Type } from '@angular/core';

const option={
  headers : new HttpHeaders()
}
@Injectable({
  providedIn: 'root'
})
// overloading headers as global 

export class DataService {

  currentUser: any
  currentAcno: any
  userDetails:any
  constructor(private http:HttpClient) { //httpclientmodule module anu httpclient athinakathulla class anu 
//this.getData()
  }

  saveData(){
    if(this.userDetails){
      localStorage.setItem("database",JSON.stringify(this.userDetails))
    }
    if(this.currentUser){
      localStorage.setItem("currentUser",this.currentUser)
    }
    if(this.currentAcno){
      localStorage.setItem("currentAcno",JSON.stringify(this.currentAcno))
    }
  }
 // getData(){
   // if(localStorage.getItem('database')){
//this.userDetails=JSON.parse(localStorage.getItem('database')|| "")
//}
  //  if(localStorage.getItem('currentUser')){
    //  this.currentUser=localStorage.getItem('currentUser')
      //    }
        //  if(localStorage.getItem('currentAcno')){
//this.currentAcno=JSON.parse(localStorage.getItem('currentAcno')|| "")
  //              }
    
   
  //}
  getToken(){
    //access token
    const token=JSON.parse(localStorage.getItem('token')||'')
    //generate header
    let headers=new HttpHeaders()
    if(token){
    //append token to header-
option.headers=headers.append("access_token",token)
}
return option;
  }
  


  register(uname: any, acno: any, psw: any) { //this is to store and also to check if the user registered data is already in ithe object or not
//create body data
    const data={uname,acno,psw}
  return this.http.post("http://localhost:3000/register",data)
  }

  login(acno: any, psw: any) {
    const data={acno,psw}
    return this.http.post("http://localhost:3000/login",data)
  }
  
  //middleware
 

  deposit(acnum: any, password: any, amount: any) {
    const data ={acnum,password,amount}
    return this.http.post("http://localhost:3000/deposit",data,this.getToken());
  
  }

  withdraw(acnum: any, password: any, amount: any) {
    const data ={acnum,password,amount}
    return this.http.post("http://localhost:3000/withdraw",data,this.getToken());
  
  }
  getTransaction(acno:any){
    const data={acno}
    return this.http.post('http://localhost:3000/transaction',data,this.getToken());
  }
  deleacc(acno:any){
    return this.http.delete('http://localhost:3000/delete/'+acno,this.getToken())
  }
}