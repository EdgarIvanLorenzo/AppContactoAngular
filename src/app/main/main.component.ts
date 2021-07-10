import { Component, OnInit } from '@angular/core';
//Activate Router para extraer los datos de los parametros
import {ActivatedRoute,Params, Router} from '@angular/router';
//Importacion del servicio
import {peticion} from '../service/servicio.service';
//Impostacion del modelo de contactos
import {Modelo} from '../model/contacto';
declare var $:any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers:[peticion]
})
export class MainComponent implements OnInit {
  //Construccion de una variable para aguardar los contactos la peticion
  contactos:Array<Modelo>;
  id:string='';
  usuario:string='';
  constructor(private _parametros:ActivatedRoute,private _peticion:peticion,private _router:Router) {
    this.contactos = [];
     //DEntro dl metodo OnInit vamos a cargar todos los datos de la base de datos
     this._parametros.params.subscribe((parametros:Params)=>{
      this._peticion.Buscar(parametros.id).subscribe(
        resolve=>{
          this.contactos=resolve.contactos;
          this.id=resolve._id;
          this.usuario=resolve.usuario;
        },
        error=>{
          console.log(error);
        }
      )
    })
  }

  ngOnInit(): void {

  }


  //?metodo del componente main para elimiar un contacto de la lista
  eliminar(id2:any):void{
    this._peticion.Eliminar(this.id,id2).subscribe(
      resolve=>{
        window.location.reload();
      },error=>{
        console.log(error);
      }
    )
  }

  //*Metodo para modificar el contacto seleccionado
  modificar(id2:any):void{
    this._router.navigate(['/modificar/'+this.id+'/'+id2]);
  }
}
