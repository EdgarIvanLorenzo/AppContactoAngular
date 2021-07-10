import { Component, OnInit } from '@angular/core';
//Servicion
import { peticion } from './../service/servicio.service';
//Impostacion de Router
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[peticion]
})
export class LoginComponent implements OnInit {
  title:string='Sesion';
  login2:login;
  constructor(private _peticion:peticion,private _router:Router) {
    this.login2={usuario:'',contrasena:''};
  }

  ngOnInit(): void {
  }

  //Funcion para buscar un usuario en el servidor
  login(formulario:any):void{
    this._peticion.Logear(this.login2).subscribe(
      resolve=>{
        //Accedemos a la ruta main con parametros id para despues consultar ese paramtro y pintar todos los contactos
        this._router.navigate(['/main/'+resolve[0]._id]);
      },
      error=>{
        alert("Usuario o contraseña Incorrecto Intentelo de nuevo");
        formulario.reset();
      }
    )
  }

}

interface login{
  usuario:string;
  contrasena:string;
}
