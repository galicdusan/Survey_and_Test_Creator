import { Component, OnInit} from '@angular/core';

import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

import {Pitanje} from '../pitanje.model'
import {Odgovor} from '../odgovor.model'
import {Test} from '../test.model'
import {Router} from '@angular/router'
import {KorisniciService} from '../korisnici.service'
import {Korisnik} from '../korisnik.model'

@Component({
  selector: 'app-pregled',
  templateUrl: './pregled.component.html',
  styleUrls: ['./pregled.component.css']
})
export class PregledComponent implements OnInit {

  pitanja: Array<Pitanje> = [];
  odgovori: Array<Odgovor>;
  test: Test;
  korisnici: Array<Korisnik> = null;
  nizOdg: string[][];
  nizPojav: number[][];
  sumPojav: number[];
  dataAvailable = false;
  sumPoints: number = 0;
  grading: Array<number> = [0,0,0,0,0,0,0,0,0,0];
  all: number = 0;

  constructor(private router:Router, private serviceK: KorisniciService) { }

  ngOnInit() {
    this.pitanja = JSON.parse( localStorage.getItem('pitanja') )
    this.odgovori = JSON.parse( localStorage.getItem('odgovori') )
    this.test = JSON.parse( localStorage.getItem('test') )

    this.all = this.odgovori.length;

    let h:number;    
    for(h=0; h<this.test.points.length; h++)
      this.sumPoints += this.test.points[h];
    let section = this.sumPoints/10;
    for(h=0; h<this.odgovori.length; h++){
      if (this.odgovori[h].points == 0){
        this.grading[0]++;
      }
      else if (this.odgovori[h].points % section == 0)
        this.grading[ this.odgovori[h].points/section - 1 ]++;
      else
        this.grading[Math.floor(this.odgovori[h].points/section)] ++;
    }

    if (this.test.type == 'test' || this.test.privatnost == 'personalizovana'){
      let usernames = [];
      let i:number;
      for(i=0; i<this.odgovori.length; i++)
        usernames.push( this.odgovori[i].user )

      this.serviceK.getMojiKorisnici(usernames).subscribe((korisnici:Array<Korisnik>)=>{
        this.korisnici = korisnici;
      })
    }

    let i:number;
    let j:number;
    let k:number;
    this.nizOdg = new Array( this.pitanja.length )
    this.nizPojav = new Array( this.pitanja.length )
    this.sumPojav = new Array( this.pitanja.length )
    for(i=0; i<this.pitanja.length; i++){
      this.nizOdg[i] = [];
      this.nizPojav[i] = [];
    }

    for(i=0; i<this.odgovori.length; i++)
      for(j=0; j<this.odgovori[i].answers.length; j++){
        let index:number;
        for(k=0; k<this.pitanja.length; k++)
          if(this.pitanja[k].id == this.odgovori[i].answers[j].id_question){
            index = k;
            break;
          }
        for(k=0; k<this.odgovori[i].answers[j].answer.length; k++){
          if (this.nizOdg[index].includes( this.odgovori[i].answers[j].answer[k] ))
            this.nizPojav[index][ this.nizOdg[index].indexOf( this.odgovori[i].answers[j].answer[k] ) ] ++;
          else {
            this.nizOdg[index].push( this.odgovori[i].answers[j].answer[k] )
            this.nizPojav[index].push(1);
          }
        }
      }
    
    for(i=0; i<this.pitanja.length;i++){
      this.sumPojav[i] = 0;
     for(j=0; j<this.nizPojav[i].length; j++)
        this.sumPojav[i] += this.nizPojav[i][j];
    }

    this.dataAvailable = true;
    console.log(this.nizOdg)
    console.log(this.nizPojav)
    console.log(this.sumPojav)   
  }


/////////////////////////////////////////////////////////////////////////////////////////////////

public pieChartOptions: ChartOptions = {
  responsive: true,
};
public pieChartLabels: Label[] = [['0-10'], ['11-20'], ['21-30'], ['31-40'], ['41-50'], ['51-60'], ['61-70'], ['71-80'], ['81-90'], ['91-100']];
public pieChartData: SingleDataSet = this.grading;
public pieChartType: ChartType = 'pie';
public pieChartLegend = true;
public pieChartPlugins = [];

}



