import { ImagenSubida } from './../service/imagen.service';

import { Component, OnInit} from '@angular/core';
//!Importacion del modelo
import { Modelo } from './../model/contacto';
//importacion del servicio
import {peticion} from '../service/servicio.service';
//importacion del componente para acceder a su id desde la ruta
import {ActivatedRoute,Params} from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  providers:[peticion,ImagenSubida]
})
export class FormularioComponent implements OnInit {
  idP:string='';
  usuarioP:string='';
  Title:string='Contacto';
  usuario:Modelo;
  imagenr:Array<any>;
  constructor(private _peticion:peticion,private _router:ActivatedRoute,private imagen: ImagenSubida) {
    this.usuario=new Modelo(0,'','','','','','','','');
    this.imagenr=[];
  }

  ngOnInit(): void {
    this._router.params.subscribe((parametros:Params)=>{
      this._peticion.Buscar(parametros.id).subscribe(
        resolve=>{
          console.log(resolve);
          this.idP=resolve._id;
          this.usuarioP=resolve.usuario;
        },
        error=>{
          console.log(error);
        }
      )
    }
    )
  }

  cargarImagen(e:any){
    //Seleccion de las imagenes convirtiendolo a ún arreglo de Files
    this.imagenr = <Array<File>>e.target.files;
    console.log(this.imagenr);
  }


  //Metodo para enviar el formulario
  Enviar():void{
   this._router.params.subscribe((parametros:Params)=>{
        this._peticion.CrearContacto(parametros.id,this.usuario).subscribe(
          resolve=>{
            let contactos:any=resolve;
            let len=contactos.length-1;
           //Metodo que retorna una promesa que ejecutamos el metodo then
            this.imagen.subir('http://192.168.1.71:3709/contactsPerfil/'+parametros.id+'/'+contactos[len]._id,this.imagenr,'images')
            .then((respuesta)=>{
                   console.log(respuesta);
            });
             alert("Existo");
              },
              error=>{
                console.log(error);
              }
            )
          },
          error=>{
            console.log(error);
          }
        )
  }

}
