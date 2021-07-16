import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TestoviService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  getTestove(){
    return this.http.get(`${this.uri}/getTestove`)
  }

  getTest(pretraga){
    const data= {
      pretraga: pretraga
    }

    return this.http.post(`${this.uri}/getTest`, data)
  }

  deleteTest(id){
    const data= {
      id: id
    }

    return this.http.post(`${this.uri}/deleteTest`, data)
  }

  getMaxId(){
    return this.http.get(`${this.uri}/getMaxIdT`)
  }

  saveTest(id, name, startDate, endDate, opis, time, 
    korime, privatnost, qArray, type, points, page){
      const data= {
        id: id,
        name: name,
        startDate: startDate,
        endDate: endDate,
        opis: opis,
        time: time,
        korime: korime,
        privatnost: privatnost,
        qArray: qArray,
        type: type,
        points: points,
        page: page
      }

      return this.http.post(`${this.uri}/saveTest`,data)
  }
}
