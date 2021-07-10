//Creacion de un servicion
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
//importacion del modelo de contactos
import {Modelo} from '../model/contacto';
import {note} from '../model/note';
import { HttpHeaders } from '@angular/common/http';
//Creacion del decorador
@Injectable()

export class peticion{
  constructor(private _http:HttpClient){
  }

  CreateUser(datos:any):Observable<any>{
    return this._http.post('http://192.168.1.71:3709/usersC',datos);
  }
  Logear(usuario:any):Observable<any>{
    let Usuario=usuario.usuario;
    let contra=usuario.contrasena;
    return this._http.get("http://192.168.1.71:3709/getUsers/"+Usuario+"/"+contra);
  }
  Buscar(id:string):Observable<any>{
    return this._http.get('http://192.168.1.71:3709/Id/'+id);
  }
  CrearContacto(id:string,params:Modelo):Observable<any>{
    let contactos={contactos:params};
    return this._http.put('http://192.168.1.71:3709/createContacts/'+id,contactos);
  }
  CrearNota(id:string,note1:note):Observable<any>{
    let note={note:note1};
    let headers=new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    return this._http.put('http://localhost:3709/createNote/'+id,note,{headers:headers});
  }
  ObtenerAllNotes(id:string):Observable<any>{
    return this._http.get('http://192.168.1.71:3709/ObtenerNotes/'+id);
  }
  EliminarNote(id:string,datos:string):Observable<any>{
    let datos2={id:datos};
    return this._http.put('http://localhost:3709/eliminarNote/'+id,datos2);
  }
  Imagen(id1:string,id2:string,datos:File):Observable<any>{
    return this._http.put('http://192.168.1.71:3709/contactsPerfil/'+id1+"/"+id2,datos);
  }
  Eliminar(id1:string,id2:string):Observable<any>{
    return this._http.put('http://192.168.1.71:3709/eliminarContacts/'+id1+"/"+id2,"");
  }
  Actualizar(id:string,id2:string,datos:any):Observable<any>{
    return this._http.put('http://192.168.1.71:3709/actualizarContacts/'+id+'/'+id2,datos);
  }
}
