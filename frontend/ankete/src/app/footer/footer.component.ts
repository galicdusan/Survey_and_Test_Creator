import { Component, OnInit } from '@angular/core';
import {Korisnik} from '../korisnik.model'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public username:string;
  user: Korisnik;

  constructor() { }

  ngOnInit() {
    this.user = JSON.parse( localStorage.getItem('korisnik') )
    if (this.user == null)
      this.username = 'default';
    else 
      this.username = this.user.korime;

    if (this.user== null)
      setTimeout(()=>{
        this.ngOnInit()
      }, 1000)
  }

}
