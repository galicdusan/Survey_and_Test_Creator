import { Component, OnInit } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import { Ng2ImgMaxService } from 'ng2-img-max';
import {KorisniciService} from '../korisnici.service';
import {Korisnik} from '../korisnik.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css'],
  
})
export class RegistracijaComponent implements OnInit {

  ime: string= "";
  prezime: string = "";
  korime: string = "";
  lozinka: string = "";
  datum: string = "";
  mesto: string = "";
  jmbg: string = "";
  telefon: string = "";
  email: string = "";

  potvrda: string = "";

  uploaded: boolean = false;
  slikastatus: string = "Posaljite svoju sliku";
  captcha:string = "";
  unique: boolean = true;
  emailOk: boolean = true;

  uploadedFile: File;

  constructor(private http: HttpClient, private ng2ImgMax: Ng2ImgMaxService, private service: KorisniciService, private router:Router){} 

  ngOnInit() {

  }

  fileChange(element) {
    this.uploadedFile = element.target.files[0];

    let image = element.target.files[0];
    this.ng2ImgMax.resizeImage(image, 300, 300).subscribe(
      result => {
        this.uploadedFile = new File([result], result.name);
      },
      error => {
        console.log('Oh no!', error);
      }
    );
  }

  upload() {
    if (this.korime == ""){
      alert('Unesite korisnicko ime prvo.')
      return
    }
    if (this.uploadedFile.name.split('.').pop() != 'jpg' && this.uploadedFile.name.split('.').pop() != 'png'){
      alert('Unesite sliku u jpg ili png formatu!');
      return
    }
    let formData = new FormData();
    formData.append("upload", this.uploadedFile, this.korime+'.jpg');
    this.http.post('http://localhost:4000/api/upload', formData)
    .subscribe((response) => {
         console.log('response received is ', response);
    })
    this.uploaded = true;
    this.slikastatus = "Slanje slike uspesno!";
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  registruj(){
    if (this.ime == ""){
      alert("Unesite vase ime.");
      return
    }
    if (this.prezime == ""){
      alert("Unesite vase prezime.");
      return
    }
    if (this.korime == ""){
      alert("Unesite vase korisnicko ime.");
      return
    }
    if (this.lozinka == ""){
      alert("Unesite vasu lozinku.");
      return
    }
    if (this.potvrda == ""){
      alert("Potvrdite vasu lozinku.");
      return
    }
    if (this.datum == ""){
      alert("Unesite vas datum rodjenja.");
      return
    }
    if (this.mesto == ""){
      alert("Unesite vase mesto rodjenja.");
      return
    }
    if (this.jmbg == ""){
      alert("Unesite vas JMBG.");
      return
    }
    if (this.telefon == ""){
      alert("Unesite vas telefon.");
      return
    }
    if (this.email == ""){
      alert("Unesite vas e-mail.");
      return
    }
    let regex1 = new RegExp('^[a-zA-Z-]{3,20}$');
    if (!regex1.test(this.ime)){
      alert("Ime mora biti duze od 3 karaktera i sme imati samo slova i znak '-'!");
      return
    }
    let regex2 = new RegExp('^[a-zA-Z-]{3,20}$');
    if (!regex2.test(this.prezime)){
      alert("Prezime mora biti duze od 3 karaktera i sme imati samo slova i znak '-'!");
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
    if (this.potvrda != this.lozinka){
      alert("Pogresno ste upisali lozinku u polju za potvrdu lozinke.")
      return
    }
    let regex5 = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
    if (!regex5.test(this.datum)){
      alert("Datum mora biti formata dd/MM/yyyy.");
      return
    }
    let regex6 = new RegExp('^[a-zA-Z-]{3,20}$');
    if (!regex6.test(this.mesto)){
      alert("Mesto mora biti od slova i duze od 3 karaktera, moze imati '-'.");
      return
    }
    let regex7 = /^\d{13}$/;
    if (!regex7.test(this.jmbg)){
      alert("JMBG mora biti sacinjen od tacno 13 cifara.");
      return
    }

    let i = 0;
    i = i + Number(this.jmbg.charAt(0)) * 7;
    i = i + Number(this.jmbg.charAt(1)) * 6;
    i = i + Number(this.jmbg.charAt(2)) * 5;
    i = i + Number(this.jmbg.charAt(3)) * 4;
    i = i + Number(this.jmbg.charAt(4)) * 3;
    i = i + Number(this.jmbg.charAt(5)) * 2;
    i = i + Number(this.jmbg.charAt(6)) * 7;
    i = i + Number(this.jmbg.charAt(7)) * 6;
    i = i + Number(this.jmbg.charAt(8)) * 5;
    i = i + Number(this.jmbg.charAt(9)) * 4;
    i = i + Number(this.jmbg.charAt(10)) * 3;
    i = i + Number(this.jmbg.charAt(11)) * 2;

    i = i % 11;
    if (i > 1) 
      i = 11 - i;

    if (i == 1 || i != Number(this.jmbg.charAt(12))){
      alert ("JMBG nije validan, kontrolna cifra se ne poklapa. Treba cifra "+ i +" da bude na kraju. Unesite validan JMBG.")
      return
    }

    let regex8 = /^(\+)?(3816|06)[0349][/\s]?\d{3}[-\s]?\d{4}$/;
    if (!regex8.test(this.telefon)){
      alert("Telefon mora biti iz Srbije, primeri: 111/111-1111, 222 222 2222, 3333333333");
      return
    }

    let regex9 = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/
    if (!regex9.test(this.email)){
      alert("Email nije dobrog formata");
      return
    }
    
    if (!this.uploaded){
      alert("Morate da posaljete sliku.");
      return
    }

  
    let regex10 = /[\/\s-]/g;
    this.telefon = this.telefon.replace(regex10, "");
    console.log(this.telefon);

    let b = this.datum.split(/\D/);
    this.datum = b.reverse().join('-');
    console.log(this.datum);


    this.service.getKorisnik(this.korime).subscribe((korisnik:Korisnik)=> {
      if (korisnik)
        this.unique = false;   
    })
    this.service.getEmailUsers(this.email).subscribe((korisnici:Array<Korisnik>)=> {
      if (korisnici.length >= 2)
        this.emailOk = false;
    })

    setTimeout(()=>{
      if (!this.unique){

        alert("Uneto korisnicko ime vec postoji, unesite drugo korisnicko ime.")
        return
      }
      if (!this.emailOk){

        alert("Uneti email vec koriste dva naloga, unesite drugi email.")
        return
      }

      this.service.saveKorisnik(this.ime, this.prezime, this.korime, this.lozinka, this.datum, this.mesto, this.jmbg, this.telefon, this.email).
      subscribe((korisnik:Korisnik)=>{
        if(korisnik){
          alert("Uspesno ste poslali zahtev za prijavu. Sacekajte admina da potvrdi i ulogujte se.")
          this.router.navigate(['/login'])
        }
        else {
          alert("Desila se greska sa nase strane, pokusajte ponovo.")
        }
      })

    }, 1000);
    this.emailOk = true;
    this.unique = true;
  }


}
