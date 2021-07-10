import { Component, OnInit,Input } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {
  estilo:object;

  //Decorador para poder recibir el id del componente main
  @Input() identificador:string='';
  @Input() usuario:string='';
  constructor(private _router:Router) {
    this.estilo={};
  }

  ngOnInit(): void {

  }
  // Metodo para cerrar la sesion
  cerrar():void{
    this._router.navigate(['']);
  }

  mostrar():void{
    this.estilo={"display":"block"};
  }

  salir():void{
    this.estilo={"display":"none"};
  }
}
