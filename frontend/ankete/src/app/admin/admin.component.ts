import { Component, OnInit } from '@angular/core';
import {Korisnik} from '../korisnik.model';
import {KorisniciService} from '../korisnici.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {

  korisnici: Array<Korisnik>;
  zahtevi: Array<Korisnik>;
  zahtev: string;
  selektovan: Korisnik;

  ime: string= "";
  prezime: string = "";
  korime: string = "";
  lozinka: string = "";
  datum: string = "";
  mesto: string = "";
  jmbg: string = "";
  telefon: string = "";
  email: string = "";
  tip: string = "";

  dataAvailable: boolean = false;

  constructor(private router:Router, private serviceK: KorisniciService) { }

  ngOnInit() {
    this.serviceK.getKorisnici('odobren').subscribe((korisnici:Array<Korisnik>)=>{
      this.korisnici = korisnici;
    })
    this.serviceK.getKorisnici('cekanje').subscribe((zahtevi:Array<Korisnik>)=>{
      this.zahtevi = zahtevi;
    })
    this.dataAvailable = true;
  }

  dodaj(){
    this.serviceK.saveKorisnik(this.ime, this.prezime, this.korime, this.lozinka, this.datum, this.mesto, this.jmbg, this.telefon, this.email).
      subscribe((korisnik:Korisnik)=>{})
  }

  azuriraj(polje, vrednost){
    this.serviceK.updatePolje(this.korime,polje,vrednost).subscribe((rezultat:any)=>{})
  }

  izbrisi(){
    this.serviceK.deleteKorisnik(this.korime).subscribe((rezultat:any)=>{})
  }

  prihvati(){
    this.serviceK.updatePolje(this.zahtev,'zahtev','odobren').subscribe((rezultat:any)=>{})
  }

  odbij(){
    this.serviceK.updatePolje(this.zahtev,'zahtev','odbijen').subscribe((rezultat:any)=>{})
  }

  promena(){
    this.ime = this.selektovan.ime;
    this.prezime = this.selektovan.prezime;
    this.korime = this.selektovan.korime;
    this.lozinka = this.selektovan.lozinka;
    this.datum = this.selektovan.datum_rodjenja;
    this.mesto = this.selektovan.mesto_rodjenja;
    this.jmbg = this.selektovan.jmbg;
    this.telefon = this.selektovan.telefon;
    this.email = this.selektovan.mail;
    this.tip = this.selektovan.tip;
  }

}
