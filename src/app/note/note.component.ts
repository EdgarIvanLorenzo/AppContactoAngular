import { Component, OnInit } from '@angular/core';
import {peticion} from '../service/servicio.service';
import {ActivatedRoute,Params} from '@angular/router';
declare var webkitSpeechRecognition: any;
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
  providers:[peticion]
})
export class NoteComponent implements OnInit {
  fechaText:string='';
  id:string='';
  usuario:string='';
  note:Note;
  //*Funcion para grabar la voz
  grabar:any=new webkitSpeechRecognition();
  constructor(public _peticion:peticion,public _datos:ActivatedRoute) {
    this.grabar.lang="es-ES";
    this.grabar.continuous=true;
    this.grabar.interimResults=false;
    //Variable de tipo Note de la interface creada
    this.note={titulo:'',texto:'',fecha:this.fechaText};
  }

  ngOnInit(): void {
    this._datos.params.subscribe((parametros:Params) =>{
      this._peticion.Buscar(parametros.id).subscribe(
        resolve=>{
          this.id=resolve._id;
          this.usuario=resolve.usuario;
        },
        error=>{
          console.log(error);
        }
      )
    })
    //Metodo del dato de tipo new webkitSpeechRecognition
    this.grabar.addEventListener('result',(e:any)=>{
      let resultado=e.results;
      let frase=resultado[resultado.length-1][0].transcript;
      this.note.texto+=" "+frase;
    })
  }

  //Metodo para comenzar a grabar
  Start(){
    this.grabar.start();
  }
  //Metodo para terminar de grabar por voz
  End(){
    this.grabar.abort();
  }

  //Metodo para enviar los datos a la base de datos
  Enviar(){
    let fechaC:Date=new Date();
    this.fechaText=fechaC.getDay()+"/"+fechaC.getMonth()+"/"+fechaC.getFullYear()+" "+fechaC.getHours()+":"+fechaC.getMinutes()+":"+fechaC.getSeconds();
    this.note.fecha=this.fechaText;
    this._peticion.CrearNota(this.id,this.note).subscribe(
      resolve=>{
        alert("Nota Aguardada");
      },
      error=>{
        alert("Nota No guardada");
      }
    )
  }

  Cancelar(formulario:any){
    this.note={titulo:'',texto:'',fecha:''};
  }

}

//Interfas para mandar lo datos
interface Note{
  titulo:string;
  texto:string;
  fecha:string;
}
