
import { Usuario } from './../model/users';
import { Component, OnInit } from '@angular/core';
//Importacion del servicio
import {peticion} from '../service/servicio.service';
//Importacion de las rutas para poder accder a otra ruta
import { Router } from '@angular/router';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [peticion]
})
export class RegistroComponent implements OnInit {
  title:string='Registro';
  registro:Usuario;
  sesion:string='Iniciar Sesion'
  constructor(private _peticion:peticion,private _router:Router) {
    this.registro=new Usuario('','','',[],[]);
   }

  ngOnInit(): void {
  }

  //Metodo para pedir la peticion
  registroUser():void{
    this._peticion.CreateUser(this.registro).subscribe(
      resolve=>{
        console.log(resolve)
          this._router.navigate(['/login/'+resolve._id]);
      },
      error=>{
        console.log(error);

      }
    )
  }
}
