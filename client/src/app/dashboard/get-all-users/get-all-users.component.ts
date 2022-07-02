import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-get-all-users',
  templateUrl: './get-all-users.component.html',
  styleUrls: ['./get-all-users.component.css']
})
export class GetAllUsersComponent implements OnInit {
  users:any[]=[]
  @Input() singleUser :any
  constructor() { }

  ngOnInit(): void {
  }

  handleEvent(eve:any){
    console.log(eve)
    this.users.push(eve)
  }

}
