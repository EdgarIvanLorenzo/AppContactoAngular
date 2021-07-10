import { Component, OnInit } from '@angular/core';
//!Importacion del modelo
import { Modelo } from './../model/contacto';
//importacion del servicio
import {peticion} from '../service/servicio.service';
//importacion del componente para acceder a su id desde la ruta
import {ActivatedRoute,Params} from '@angular/router';
import {ImagenSubida} from '../service/imagen.service';

@Component({
  selector: 'app-modificar',
  templateUrl: '../formulario/formulario.component.html',
  styleUrls: ['../formulario/formulario.component.css'],
  providers: [peticion,ImagenSubida]
})
export class ModificarComponent implements OnInit {
  idP:string='';
  usuarioP:string='';
  Title:string='Modificar';
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
          let contactos:Array<Modelo>=resolve.contactos;
          let index=contactos.findIndex((elemento)=>{
            return elemento._id==parametros.id2;
          });
          this.usuario._id=contactos[index]._id;
          this.usuario.nombre=contactos[index].nombre;
          this.usuario.apellidos=contactos[index].apellidos;
          this.usuario.numero=contactos[index].numero;
          this.usuario.facebook=contactos[index].facebook;
          this.usuario.twitter=contactos[index].twitter;
          this.usuario.instagram=contactos[index].instagram;
          this.usuario.gmail=contactos[index].gmail;
        },
        error=>{
          console.log(error);
        }
      )
    })
  }

  cargarImagen(e:any){
    //Seleccion de las imagenes convirtiendolo a ún arreglo de Files
    this.imagenr = <Array<File>>e.target.files;
    console.log(this.imagenr);
  }


  //Metodo para enviar el formulario
  Enviar():void{
   this._router.params.subscribe((parametros:Params)=>{
        this._peticion.Actualizar(parametros.id,parametros.id2,this.usuario).subscribe(
          resolve=>{
            console.log(resolve);
            let contactos:any=[...resolve.contactos];
            let index=contactos.findIndex((elemento:any)=>{
              return elemento._id==parametros.id2;
            })
           //Metodo que retorna una promesa que ejecutamos el metodo then
            this.imagen.subir('http://localhost:3709/contactsPerfil/'+parametros.id+'/'+contactos[index]._id,this.imagenr,'images')
            .then((r)=>{
                   console.log(r);
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
