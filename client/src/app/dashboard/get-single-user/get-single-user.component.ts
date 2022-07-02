import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-get-single-user',
  templateUrl: './get-single-user.component.html',
  styleUrls: ['./get-single-user.component.css']
})
export class GetSingleUserComponent implements OnInit {
  id:any
  singleUser:any
  

  constructor(private activated : ActivatedRoute , private global :GlobalService) {
    this.id = activated.snapshot.paramMap.get("id")
    console.log(this.id)
    this.global.getSingleUser(this.id).subscribe(data=>{
      console.log(data)
      this.singleUser = data
    })
   }

  ngOnInit(): void {
  }

}
