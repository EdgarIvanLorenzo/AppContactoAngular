import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { MainComponent } from './main/main.component';
import {Routes,RouterModule} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormularioComponent } from './formulario/formulario.component'
import {FormsModule} from '@angular/forms';
import { RegistroComponent } from './registro/registro.component';
import {HttpClientModule} from '@angular/common/http';
import { ModificarComponent } from './modificar/modificar.component';
import { NoteComponent } from './note/note.component';
import { AllNotesComponent } from './all-notes/all-notes.component';
//Rutas
const ruta:Routes=[
  {path:'',component:RegistroComponent},
  {path:'login',component:LoginComponent},
  {path:'main/:id',component:MainComponent},
  {path:'form/:id',component:FormularioComponent},
  {path:'note/:id',component:NoteComponent},
  {path:"allnotes/:id",component:AllNotesComponent},
  {path:'regis',component:RegistroComponent},
  {path:'modificar/:id/:id2',component:ModificarComponent},
  {path:'**',component:LoginComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    NavegacionComponent,
    MainComponent,
    LoginComponent,
    FormularioComponent,
    RegistroComponent,
    ModificarComponent,
    NoteComponent,
    AllNotesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(ruta,{ enableTracing: true } ),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
