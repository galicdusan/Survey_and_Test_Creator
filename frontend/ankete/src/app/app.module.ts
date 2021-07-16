import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistracijaComponent } from './registracija/registracija.component';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {Ng2ImgMaxModule} from 'ng2-img-max';
import {RecaptchaModule, RecaptchaFormsModule} from 'ng-recaptcha';
import {KorisniciService} from './korisnici.service';
import { IspitanikComponent } from './ispitanik/ispitanik.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component'
import {TestoviService} from './testovi.service'
import {PitanjaService} from './pitanja.service'
import {OdgovoriService} from './odgovori.service';
import { IzradaComponent } from './izrada/izrada.component';
import { RezultatComponent } from './rezultat/rezultat.component';
import { AutorComponent } from './autor/autor.component';
import { PregledComponent } from './pregled/pregled.component';
import {ChartsModule} from 'ng2-charts';
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistracijaComponent,
    IspitanikComponent,
    PromenaLozinkeComponent,
    IzradaComponent,
    RezultatComponent,
    AutorComponent,
    PregledComponent,
    AdminComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    Ng2ImgMaxModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    ChartsModule
  ],
  providers: [KorisniciService, TestoviService, PitanjaService, OdgovoriService],
  bootstrap: [AppComponent]
})
export class AppModule { }
