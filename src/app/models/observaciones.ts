import { Usuarios } from "./usuarios.model";
import { Vehiculos } from "./vehiculos";

export interface Observaciones{
  id?:string,
  creado_por:Usuarios,
  resuelto_por:Usuarios,
  estado:string,
  vehiculo:Vehiculos,
  descripcion:string
}