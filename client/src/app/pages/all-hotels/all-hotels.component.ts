import { Component, OnInit , Input} from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-all-hotels',
  templateUrl: './all-hotels.component.html',
  styleUrls: ['./all-hotels.component.css']
})
export class AllHotelsComponent implements OnInit {
  hotels= []
  constructor(private global:GlobalService) { 
    this.global.getAllHotels().subscribe(data=>{
      this.hotels = data
    })
  }

  ngOnInit(): void {
  }

}
