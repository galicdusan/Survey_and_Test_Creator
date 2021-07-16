import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KorisniciService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  saveKorisnik(ime, prezime, korime, lozinka, datum, mesto, jmbg, telefon, email){
    const data = {
      ime: ime,
      prezime: prezime,
      korime: korime,
      lozinka: lozinka,
      datum: datum,
      mesto: mesto,
      jmbg: jmbg,
      telefon: telefon,
      email: email
    }

    return this.http.post(`${this.uri}/saveKorisnik`,data)
  }

  getKorisnik(korime){
    const data = {
      korime: korime
    }

    return this.http.post(`${this.uri}/getKorisnik`, data)
  }

  getEmailUsers(email){
    const data = {
      email: email
    }

    return this.http.post(`${this.uri}/getEmailUsers`, data)
  }

  updateLozinka(lozinka, korime){
    const data = {
      lozinka: lozinka,
      korime: korime
    }

    return this.http.post(`${this.uri}/updateLozinka`, data);
  }

  getMojiKorisnici(usernames){
    const data = {
      usernames: usernames
    }

    return this.http.post(`${this.uri}/getMojiKorisnici`, data)
  }

  getKorisnici(zahtev){
    const data= {
      zahtev: zahtev
    }

    return this.http.post(`${this.uri}/getKorisnici`, data)
  }

  updatePolje(korime,polje,vrednost){
    const data = {
      korime: korime,
      polje: polje,
      vrednost: vrednost
    }

    return this.http.post(`${this.uri}/updatePolje`,data)
  }

  deleteKorisnik(korime){
    const data = {
      korime: korime
    }

    return this.http.post(`${this.uri}/deleteKorisnik`,data)
  }
}
