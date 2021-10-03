import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Vehiculos } from '../models/vehiculos';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {

  nameColection:string = "vehiculos"
  constructor(
    private afs:AngularFirestore
  ) { 

  }
  getVehiculos(){
    return this.afs.collection(this.nameColection).snapshotChanges();
  }
  getVehiculo(id:string){
    //return this.http.get<Vehiculoss>(environment.url_api+`/Vehiculosss/${id}`);
    return this.afs.collection(this.nameColection).doc(id).get();
  }
  createVehiculos(Vehiculos:Vehiculos){
    //return this.http.post(environment.url_api+'/Vehiculosss',Vehiculoss);
    return this.afs.collection(this.nameColection).add(Vehiculos);
  }
  updateVehiculos(Vehiculos:Vehiculos){
    //return this.http.put(environment.url_api+'/Vehiculosss/'+id,changes);
    const id = Vehiculos.id;
    delete Vehiculos.id;
    return this.afs.doc(this.nameColection+'/'+id).update(Vehiculos);
  }
  deleteVehiculoss(id:string){
    //return this.http.delete(environment.url_api+`/Vehiculosss/${id}`);
    return this.afs.doc(this.nameColection+'/'+id).delete();
  }

}
