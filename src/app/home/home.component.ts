import { Component, OnInit } from '@angular/core';
import { ObservacionesService } from '../core/observaciones.service';
import { Observaciones } from '../models/observaciones';
import { Chart, registerables } from '../../../node_modules/chart.js';
import { UsuariosService } from '../core/usuarios.service';
import { Usuarios } from '../models/usuarios.model';
import { Registro } from '../models/registro';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  observaciones: Observaciones[] = [];
  usuarios: Usuarios[] = [];
  registroXUsuario:Registro[] = [];
  totalAceptado = 0;
  totalRechazado = 0;
  totalRegistrado = 0;
  displayedColumns: string[] = ['empleado', 'registradas', 'aceptadas', 'rechazadas'];
  constructor(
    private observacionesService: ObservacionesService,
    private usuariosService: UsuariosService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.fetchUsuarios();
  }

  fetchUsuarios(){
    this.usuariosService.getUsuarios().subscribe(
      data => {
        this.usuarios = data.map( e => {
          const dat:any = e.payload.doc.data();
          return{
            id : e.payload.doc.id,
            ...dat
          } as Usuarios
        })
        this.observacionesService.getObservaciones().subscribe(
          data => {
            this.observaciones = data.map(e => {
              const dat: any = e.payload.doc.data();
              return {
                id: e.payload.doc.id,
                ...dat
              } as Observaciones
            })
            
            //creas tu algoritmo
            let cont = 0;
            let aux:Registro[] = [];
            let auxtotalRegistrados = 0;
            let auxtotalAceptados = 0;
            let auxtotalRechazados = 0;
            this.usuarios.forEach( usu => {
              aux[cont] = {
                'registrado' : 0,
                'aceptado' : 0,
                'rechazado' : 0,
                'name' : usu.name
              }
              this.observaciones.forEach( obs => {

                // console.log( 'usairo'+usu.name+' obs creado'+obs.creado_por.name)
                // console.log( 'usairo'+usu.name+' obs rreusuelto'+obs.resuelto_por.name)
                if(usu.name == obs.creado_por.name){
                  aux[cont].registrado++;
                  auxtotalRegistrados++;
                }
                if(usu.name == obs.resuelto_por.name){
                  if(obs.estado == 'Aceptado'){
                    aux[cont].aceptado++;
                    auxtotalAceptados++;
                  }else{
                    aux[cont].rechazado++;
                    auxtotalRechazados++;
                  }
                }
                
              })
              cont++;
            })
            console.log(this.registroXUsuario);
            this.registroXUsuario = aux;
            this.totalRegistrado = auxtotalRegistrados;
            this.totalAceptado = auxtotalAceptados;
            this.totalRechazado = auxtotalRechazados;
            this.loadChart()
          }
        )
      }
    )
  }

  loadChart(){
    let myChart = new Chart("obsTotales", {
      type: 'bar',
      data: {
        labels: ['registrado', 'aceptado', 'rechazado'],
        datasets: [
          {
            label: 'registrado',
            data: [this.totalRegistrado, 0, 0],
            borderColor: "#572364",
            backgroundColor: "#572364",
          },
          {
            label: 'aceptado',
            data: [0, this.totalAceptado, 0],
            borderColor: "rgb(255,255,255)",
            backgroundColor: "green",
          },
          {
            label: 'rechazado',
            data: [0, 0, this.totalRechazado],
            borderColor: "rgb(255,255,255)",
            backgroundColor: "red",
          },

        ]
      },
      options: {
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 2,
          }
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Observaciones Totales'
          }
        }
      },
    })
  }

}
