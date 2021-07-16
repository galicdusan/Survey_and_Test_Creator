import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import {KorisniciService} from '../korisnici.service';
import {Korisnik} from '../korisnik.model'

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit {

  nova: string;
  stara: string;
  potvrda: string;

  constructor(private router: Router, private service: KorisniciService) { }

  ngOnInit() {
  }

  promeni() {
    if (this.stara == ""){
      alert("Unesite vasu staru lozinku.");
      return
    }
    if (this.nova == ""){
      alert("Unesite vasu novu lozinku.");
      return
    }
    if (this.potvrda == ""){
      alert("Potvrdite vasu lozinku.");
      return
    }
    
    let korisnik:Korisnik = JSON.parse( localStorage.getItem("korisnik") )
    if (this.stara != korisnik.lozinka){
      alert("Niste uneli svoju staru lozinku. Probajte ponovo.")
      return
    }

    let regex4 = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*))[a-zA-Z]{1}.{7,}/; 
    if (!regex4.test(this.nova)){
      alert("Lozinka mora imati bar 8 karaktera, pocinje slovom, ima bar jedan broj, bar jedan specijalni znak, bar jedno veliko slovo.");
      return
    }
    if (this.potvrda != this.nova){
      alert("Niste dobro uneli potvrdu lozinke. Probajte ponovo.")
      return
    }

    this.service.updateLozinka(this.nova, korisnik.korime).subscribe((rezultat:any)=> {
      if(rezultat){}
      else {}
      localStorage.clear();
      this.router.navigate(['/login'])
    })
  }

  cancel() {
    let korisnik:Korisnik = JSON.parse( localStorage.getItem("korisnik") )
    this.router.navigate(['/'+korisnik.tip])
  }

}
