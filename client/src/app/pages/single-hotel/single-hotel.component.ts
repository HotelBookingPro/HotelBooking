import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-single-hotel',
  templateUrl: './single-hotel.component.html',
  styleUrls: ['./single-hotel.component.css']
})
export class SingleHotelComponent implements OnInit {
  id:any
  singleHotel:any
  constructor(private activated : ActivatedRoute , private global :GlobalService) {
    this.id = activated.snapshot.paramMap.get("postId")
    console.log(this.id)
    this.global.getSingleHotel(this.id).subscribe(data=>{
      console.log(data)
      this.singleHotel = data
    }) 
   }

  ngOnInit(): void {
  }

}
