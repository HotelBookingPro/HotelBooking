import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  users:any[]=[]
  constructor(private global:GlobalService) { }

  ngOnInit(): void {
    this.global.getUsers().subscribe(data=>{
      console.log(data)
      this.users=data
    })
  }

}
