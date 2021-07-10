//!Servicio para cargar el nuevo servicio de la subida de imagenes al api
import {Injectable} from '@angular/core';

@Injectable()


export class ImagenSubida{

  //Construccion de la variable de la url
  constructor(){
  }


  //!Metodo que nos va a permitir subir la imagen a la base de datos
  subir(url:string,files:Array<File>,name:string):Promise<any>{
    //Creacion de una promesa
    return new Promise((resolve,reject)=>{
      //Creacion de un avariable del formato FormData
      let data=new FormData();
      //Creacion de una variable para realizar peticiones asincronas
      let xhr=new XMLHttpRequest();

      //Ciclo para agregar esos elementos al formato xhr
      for(let i=0;i<files.length;++i){
        data.append(name,files[i],files[i].name);
      }

      xhr.onreadystatechange=function(){
        //* indica que ha reciido la peticion del servidor
        if(xhr.readyState==2){
          //? peticion correcta del servidor
          //? 200=correcta
          //Todo 404=No encontrado
          //! 500=Error interno con el servidor
          if(xhr.status==200){
            return resolve(JSON.parse(xhr.response));
          }else{
            return reject(xhr.response);
          }
        }
      }

      xhr.open('POST', url, true);
      xhr.send(data);

    });
  }

}
