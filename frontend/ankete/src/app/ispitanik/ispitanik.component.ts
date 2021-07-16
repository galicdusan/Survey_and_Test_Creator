import { Component, OnInit } from '@angular/core';
import {Test} from '../test.model';
import {Router} from '@angular/router'
import {TestoviService} from '../testovi.service';
import {Odgovor} from '../odgovor.model'
import {OdgovoriService} from '../odgovori.service';
import {Korisnik} from '../korisnik.model'

@Component({
  selector: 'app-ispitanik',
  templateUrl: './ispitanik.component.html',
  styleUrls: ['./ispitanik.component.css']
})
export class IspitanikComponent implements OnInit {

  testovi:Array<Test>;
  message: string = "";
  order: string;
  criteria: string;
  about: string = "";
  message2: string = "";
  korisnik: Korisnik;
  dozvoliRad: boolean = false;
  izabrani: Test;
  pretraga: string;

  constructor(private router: Router, private serviceT: TestoviService, private serviceO: OdgovoriService) { }

  ngOnInit() {
    this.getTestove();
    this.korisnik = JSON.parse( localStorage.getItem('korisnik') )
  }

  getTestove(){
    this.serviceT.getTestove().subscribe((testovi:Array<Test>)=>{
      if(testovi.length > 0)
        this.testovi = testovi;
      else 
        this.message = "Nema testova unesenih.";
    })
  }

  orderThem(){
     if(this.order == '+')
     this.testovi = this.testovi.sort((a,b)=>{
     //  return a[this.criteria] > b[this.criteria] ? 1 : a[this.criteria] < b[this.criteria] ? -1 : 0;  
        return a[this.criteria].localeCompare(b[this.criteria]);
     })
     else 
     this.testovi = this.testovi.sort((a,b)=>{
     // return a[this.criteria] > b[this.criteria] ? -1 : a[this.criteria] < b[this.criteria] ? 1 : 0;  
        return b[this.criteria].localeCompare(a[this.criteria]);
    })
  }

  desno(t:Test){
    this.izabrani = t;
    this.about = t.about;
    this.serviceO.checkOdgovor(t.id, this.korisnik.korime).subscribe((odgovor:Odgovor)=>{
        let newDate = new Date(t.endDate);
        let twoDate = new Date(t.startDate);
        let today = new Date();
        if (odgovor && t.type=='test'){
          this.dozvoliRad = false;
          let i: number, max:number = 0;
          for (i=0; i<t.points.length; i++)
            max += t.points[i];
          this.message2 = "Vec ste zavrsili ovaj test ranije, ne mozete opet da ga radite. Vas rezultat na ovom testu je: " + odgovor.points + " poena od ukupno " + max +".";
        }
        else if (newDate < today){
          this.message2 = "Istekao je rok za izradu ovog testa/ankete."
          this.dozvoliRad = false;
        }
        else if (twoDate > today){
          this.message2 = "Test/anketa nije jos uvek otvorena. Sacekajte pocetni datum."
          this.dozvoliRad = false;
        }
        else if (odgovor && t.type=='anketa'){
            if (odgovor.zakljucan == 1){
              this.message2 = "Zakljucali ste anketu. Ne mozete promeniti unete odgovore."
              this.dozvoliRad = false;
            }
            else {
              localStorage.setItem('stanje', JSON.stringify(odgovor) )
              this.message2 = "Mozete slobodno nastaviti sa popunjavanjem ankete tamo gde ste stali."
              this.dozvoliRad = true;
            }
        }
        else {
          this.message2 = "Mozete poceti sa izradom testa/ankete pritiskom na dugme."
          this.dozvoliRad = true;
        }
    })
  }

  pocni(){
    localStorage.setItem('test', JSON.stringify(this.izabrani) )
    this.router.navigate(['/izrada']);
  }

  pretrazi(){
    this.serviceT.getTest(this.pretraga).subscribe((testovi:Array<Test>)=>{
      if (testovi.length > 0)
        this.testovi = testovi;
      else 
        this.message = "Nema testova za slicnim imenom";
    })
  }

}
