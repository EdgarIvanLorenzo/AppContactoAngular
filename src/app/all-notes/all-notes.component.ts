import { Component, OnInit } from '@angular/core';
import {peticion} from '../service/servicio.service'
import { ActivatedRoute,Params } from '@angular/router';
@Component({
  selector: 'app-all-notes',
  templateUrl: './all-notes.component.html',
  styleUrls: ['./all-notes.component.css'],
  providers:[peticion]
})
export class AllNotesComponent implements OnInit {
  id:string;
  usuario:string;
  notas:Array<any>
  constructor(private _peticion:peticion,private _router:ActivatedRoute) {
    this.id ='';
    this.usuario ='';
    this.notas=[];
  }

  ngOnInit(): void {
    this._router.params.subscribe((parametros:Params)=>{
      this._peticion.Buscar(parametros.id).subscribe(
        resolve=>{
          this.id=resolve._id;
          this.usuario=resolve.usuario;
        },error=>{
          alert("Error al cargar el componente")
        }
      )

      this._peticion.ObtenerAllNotes(parametros.id).subscribe(
        resolve=>{
          this.notas=resolve;
          console.log(this.notas);
        },error=>{
          alert(error);
        }
      )
    })
  }

  //Metodo para eliminar una nota
  Eliminar(id:string){
    this._peticion.EliminarNote(this.id,id).subscribe(
      resolve=>{
        window.location.reload();
      },error=>{
        console.log(error);
      }
    )
  }

}
