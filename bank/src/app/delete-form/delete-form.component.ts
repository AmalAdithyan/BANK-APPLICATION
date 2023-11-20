import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';

@Component({
  selector: 'app-delete-form',
  templateUrl: './delete-form.component.html',
  styleUrls: ['./delete-form.component.css']
})
export class DeleteFormComponent implements OnInit {
  @Input() item:String|undefined
  @Output() oncancel= new EventEmitter()
 @Output() onDelete=new EventEmitter()
  //event creation
  constructor(){}
ngOnInit(): void {
  
}
onCancel(){
  this.oncancel.emit()
}
deleteAcc(){
this.onDelete.emit(this.item)
}
}
