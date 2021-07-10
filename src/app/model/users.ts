export class Usuario{
  nombre:string;
  usuario:string;
  contrasena:string;
  contactos:[];
  notas:[];
  constructor(nombre:string,usuario:string,contrasena:string,contactos:[],notas:[]){
    this.nombre=nombre;
    this.usuario=usuario;
    this.contrasena=contrasena;
    this.contactos=contactos;
    this.notas=notas;
  }
}
