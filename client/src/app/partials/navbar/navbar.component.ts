import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public global : GlobalService , private route : Router) { }

  ngOnInit(): void {
  }
  handleLogOut(){
    localStorage.removeItem("token")
    this.global.isLogin = false
    this.route.navigate(["/"])
  }
}
