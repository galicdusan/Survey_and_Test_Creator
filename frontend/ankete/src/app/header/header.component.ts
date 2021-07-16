import { Component, OnInit } from '@angular/core';
import {Korisnik} from '../korisnik.model'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public destination:string;
  user: Korisnik;


  constructor() { }

  ngOnInit() {
    this.user = JSON.parse( localStorage.getItem('korisnik') )
    if (this.user == null)
      this.destination = '/login';
    else 
      this.destination = '/'+this.user.tip;

    if (this.user== null)
      setTimeout(()=>{
        this.ngOnInit()
      }, 1000)
  }

}
