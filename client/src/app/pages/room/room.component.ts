import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  data:any
  loadingFlag:boolean = false
  constructor(private global:GlobalService) { }

  ngOnInit(): void {

  }

}
