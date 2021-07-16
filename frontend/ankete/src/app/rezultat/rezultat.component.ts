import { Component, OnInit } from '@angular/core';

import { Odgovor } from '../odgovor.model';
import {Pitanje} from '../pitanje.model';
import {OdgovoriService} from '../odgovori.service';
import {PitanjaService} from '../pitanja.service';
import {Router} from '@angular/router';
import {Test} from '../test.model';
import {Korisnik} from '../korisnik.model'

@Component({
  selector: 'app-rezultat',
  templateUrl: './rezultat.component.html',
  styleUrls: ['./rezultat.component.css']
})
export class RezultatComponent implements OnInit {

  message: string = "";
  vreme: string;
  ovajTest: Test;
  message2: string ="";
  uradjeno: number = 0;
  odgovor: Odgovor;
  procenat: number;
  ostvareni: number = 0;
  ukupni: number = 0;
  pitanja: Array<Pitanje>;
  zavrsio: boolean = false;
  poeni: Array<number> = [];

  constructor(private router: Router, private serviceO: OdgovoriService) { }

  ngOnInit() {
    this.pitanja = JSON.parse( localStorage.getItem('pitanja') )
    this.ovajTest = JSON.parse( localStorage.getItem('test') )
    if (this.ovajTest.type=='test'){
      this.vreme = localStorage.getItem('vreme')
        this.tajmer();
      this.message = "Preostalo vreme za resavanje: "
    }
    this.odgovor = JSON.parse( localStorage.getItem('stanje') )
    let i: number;
    for(i=0; i<this.odgovor.answers.length; i++){
      let j: number;
      for(j=0; j<this.odgovor.answers[i].answer.length; j++)
        if (this.odgovor.answers[i].answer[j] != ""){
          this.uradjeno++;
          break;
        }
    }
    this.procenat = Math.floor(this.uradjeno * 100 / this.odgovor.answers.length);
    console.log(this.ovajTest.points)
    if (this.ovajTest.type=='test'){
      for(i=0; i<this.ovajTest.points.length; i++){
        this.ukupni += this.ovajTest.points[i];
        let index = this.ovajTest.questions.indexOf( this.pitanja[i].id);

        this.poeni[i] = this.ovajTest.points[index];

        let j: number;
        for(j=0; j<this.odgovor.answers[i].answer.length; j++){
          if (this.odgovor.answers[i].answer[j] != ""){
            if ( this.pitanja[i].correct.includes(this.odgovor.answers[i].answer[j]) ){

              this.ostvareni +=  this.ovajTest.points[index] / this.pitanja[i].correct.length;
            }
            else {
              if (this.pitanja[i].type == '5'){

                this.ostvareni -=  this.ovajTest.points[index] / this.pitanja[i].correct.length;
              }
            } 
          }
        }
      }

      this.ostvareni = Math.round( this.ostvareni * 100) / 100;
    }
  }

  tajmer(){
    let time: number;
    
    let intervalId = setInterval(()=>{
      time = Number(this.vreme.charAt(0)) * 60 + Number(this.vreme.charAt(2)) * 10 + Number(this.vreme.charAt(3));
      time --;
      this.vreme = String(Math.floor(time/60)) + ":";
      if (time%60 >= 10)
        this.vreme += String(time%60);
      else
        this.vreme += "0" + String(time%60);
      
      if (time == 10)
        this.message2 = "Paznja! Test se uskoro zatvara."
      if (time == 0){ 
        clearInterval(intervalId);
        this.message2 = ""        
        localStorage.setItem('vreme', '0:01')
      }
    }, 1000)
  }

  kasnije(){
    this.serviceO.saveOdgovor(
      this.odgovor.id_test, this.odgovor.user, this.odgovor.points, this.odgovor.zakljucan, this.odgovor.answers).subscribe((rezultat:any)=>{})
    let korisnik: Korisnik = JSON.parse( localStorage.getItem('korisnik') )
    localStorage.clear()
    localStorage.setItem('korisnik', JSON.stringify(korisnik) )
    this.router.navigate(['/ispitanik'])
  }

  vrati(){
    if(this.zavrsio == true){
      this.message = "Zavrsili ste, ne mozete da se vratite na izradu";
      return
    }
    if (this.ovajTest.type=='test'){
      if(localStorage.getItem('vreme') != '0:01'){
        localStorage.setItem('vreme', this.vreme)
        this.router.navigate(['/izrada'])
      }
      else {
        this.vreme = ""
        this.message = "Ne mozete da se vratite nazad, isteklo je vreme za izradu."
      }
    }
    else {
      this.router.navigate(['/izrada'])
    }
  }

  zavrsi(){
    this.zavrsio = true;
    if (this.ovajTest.type=='test'){
      this.odgovor.points = this.ostvareni;
      this.vreme = "0:01";
    }
    this.odgovor.zakljucan = 1;
    this.serviceO.saveOdgovor(
      this.odgovor.id_test, this.odgovor.user, this.odgovor.points, this.odgovor.zakljucan, this.odgovor.answers).subscribe((rezultat:any)=>{})
  }

  home(){
    let korisnik: Korisnik = JSON.parse( localStorage.getItem('korisnik') )
    localStorage.clear()
    window.localStorage.clear();
    localStorage.setItem('korisnik', JSON.stringify(korisnik) )
    this.router.navigate(['/ispitanik'])
  }


}
