import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {RegistracijaComponent} from './registracija/registracija.component';
import {LoginComponent} from './login/login.component'
import {PromenaLozinkeComponent} from './promena-lozinke/promena-lozinke.component';
import {IspitanikComponent} from './ispitanik/ispitanik.component';
import {IzradaComponent} from './izrada/izrada.component';
import {RezultatComponent} from './rezultat/rezultat.component';
import {AutorComponent} from './autor/autor.component';
import {PregledComponent} from './pregled/pregled.component'
import {AdminComponent} from './admin/admin.component'
import {FooterComponent} from './footer/footer.component'


const routes: Routes = [
  {path:'registracija', component: RegistracijaComponent},
  {path:'login', component: LoginComponent},
  {path:'', component: LoginComponent},
  {path:'promenaLozinke', component: PromenaLozinkeComponent},
  {path:'ispitanik', component: IspitanikComponent},
  {path:'izrada', component: IzradaComponent},
  {path:'rezultat', component: RezultatComponent},
  {path:'autor', component: AutorComponent},
  {path:'pregled', component: PregledComponent},
  {path:'admin', component: AdminComponent},
  {path:'footer', component: FooterComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
