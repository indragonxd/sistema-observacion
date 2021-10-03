import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observaciones } from '../models/observaciones';

@Injectable({
  providedIn: 'root'
})
export class ObservacionesService {
  nameColection:string = "observaciones"
  constructor(
    private afs:AngularFirestore
  ) { 

  }
  getObservaciones(){
    return this.afs.collection(this.nameColection).snapshotChanges();
  }
  getObservacion(id:string){
    //return this.http.get<Observacioness>(environment.url_api+`/Observacionesss/${id}`);
    return this.afs.collection(this.nameColection).doc(id).get();
  }
  createObservaciones(Observaciones:Observaciones){
    //return this.http.post(environment.url_api+'/Observacionesss',Observacioness);
    return this.afs.collection(this.nameColection).add(Observaciones);
  }
  updateObservaciones(Observaciones:Observaciones){
    //return this.http.put(environment.url_api+'/Observacionesss/'+id,changes);
    const id = Observaciones.id;
    delete Observaciones.id;
    return this.afs.doc(this.nameColection+'/'+id).update(Observaciones);
  }
  deleteObservacioness(id:string){
    //return this.http.delete(environment.url_api+`/Observacionesss/${id}`);
    return this.afs.doc(this.nameColection+'/'+id).delete();
  }

}
