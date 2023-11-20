import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit{
  transactionData:any

  constructor(private ds:DataService){
    this.ds.getTransaction(JSON.parse(localStorage.getItem("currentAcno") || "")).subscribe((result:any)=>{
 this.transactionData=result.transaction
    })


  }
ngOnInit(): void {
  
}
}