import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import {Korisnik} from '../korisnik.model';
import {KorisniciService} from '../korisnici.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  korime: string= "";
  lozinka: string= "";

  constructor(private router:Router, private service: KorisniciService) { }

  ngOnInit() {
    localStorage.clear();
  }

  login(){
    if (this.korime == ""){
      alert("Unesite vase korisnicko ime.");
      return
    }
    if (this.lozinka == ""){
      alert("Unesite vasu lozinku.");
      return
    }

    let regex3 = new RegExp('^[a-zA-Z0-9-_]{8,25}$');
    if (!regex3.test(this.korime)){
      alert("Korisnicko ime mora imati bar 8 karaktera i sme imati alfanumerike i znakove '-' i '_'!");
      return
    }
    let regex4 = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*))[a-zA-Z]{1}.{7,}/; 
    if (!regex4.test(this.lozinka)){
      alert("Lozinka mora imati bar 8 karaktera, pocinje slovom, ima bar jedan broj, bar jedan specijalni znak, bar jedno veliko slovo.");
      return
    }

    let destination;

    this.service.getKorisnik(this.korime).subscribe((korisnik:Korisnik)=> {
      if (korisnik){
        if(korisnik.lozinka != this.lozinka){
          alert("Uneli ste pogresnu lozinku. Pokusajte ponovo.")
          return
        }

        localStorage.setItem("korisnik", JSON.stringify(korisnik))
        if(korisnik.zahtev == 'cekanje')
        {
          alert('Vas nalog jos uvek nije aktiviran, pokusajte kasnije.')
          return
        }
        else if (korisnik.zahtev == 'odbijen'){
          alert('Vas zahtev za kreiranje naloga je odbijen.')
          return
        }
        else if (korisnik.tip == 'ispitanik'){
        //  this.router.navigate(['/ispitanik'])
        destination = '/ispitanik';
        }
        else if (korisnik.tip == 'autor') {
        //  this.router.navigate(['/autor'])
        destination = '/autor'
        }
        else {
        //  this.router.navigate(['/admin'])
        destination = '/admin'
        }

        this.router.navigate([destination]);

      }
      else {
        alert("Ne postoji korisnik sa unetim korisnickim imenom.")
        return
      }
    })
  }

  registruj(){
    this.router.navigate(['/registracija']);
  }
}
