
import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {
  userData ={
    userName:"",
    userEmail:""
  }
  @Output() sendingUser = new EventEmitter<any>()

  constructor() { }

  ngOnInit(): void {
  }
  handleForm(){
    console.log(this.userData)
    const user = {
      userName : this.userData.userName,
      userEmail : this.userData.userEmail,
    }

    this.sendingUser.emit(user)
}
}