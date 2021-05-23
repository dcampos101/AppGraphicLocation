import { HttpClient } from '@angular/common/http';
import {AfterViewInit, Component, ElementRef, OnInit, Output, ViewChild} from '@angular/core';
//import { DomSanitizer } from '@angular/platform-browser';
import { Datatrip, Dat_Viajes } from '../../models/table'

declare var google: any;

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit, AfterViewInit  {
  //public titulo: string;
  public contenido: string;
  //public dat: string;
  public archivos: any = [];
  http2: any;
  public resultado = {} as any;
  //barChart: ElementRef;
  //datresult: Dat_Viajes[] = [];
  //public datos:resultado[];
  //-----------------------------------------------------------------------//

  readFile(event :any) {
    //let file = event.files[0];
    
    const archivoCapturado = event.target.files[0]
    let reader = new FileReader();
  
   // reader.readAsText(file);
    let  dat2 = reader.readAsText(archivoCapturado);
    reader.onload = function() {
      //
      //let dat: string | ArrayBuffer | null;      
      let dat = reader.result as any;
      //console.log(dat);
   
      let arr = [];
      arr = dat.split('\n')
     // console.log(arr);
     //let arr2 =  dat.split('-')
     //console.log(arr[0]); //titulo
     //["ID|PLACA|DNI|TRIPS|PRODUCTID", "545|ABD001|9156666522|50|85"]
     let arregloText = arr.toString();
     
     var arregloText2 = arregloText.replace(/\n|\r/g, "");
     let arr_d = [];
     arr_d = arregloText2.split(',')

     //console.log(arr_d);
     //columnas
      let columnas = [];

      columnas = arr_d[0].split('|');
      console.log(columnas);
/*
      columnas.forEach(function(elemento, indice, array) {
        console.log(elemento, indice);
    })
*/
      //eliminar columnas
      //let arr_datos = [];
      //arr_d.shift()
      //arr_datos = arr_d
      //console.log(arr_datos);
      //definir filas
      let llenar = [];
      var long = arr_d.length
      for (var f = 1; f < long; f++){
        //llenar = arr_d[f].split('|');
        llenar.push(arr_d[f].split('|'));
        //llenar[f] = arr_d[f].split('|');
      //  filas = arr_d[1].split('|');
      };
      //llenar.toString;
      let filas = [];
      filas = llenar;
      
     /* for (var f = 0; f < llenar.length; f++){
        //llenar = arr_d[f].split('|');
        filas = llenar[f].toString(); //.push(arr_d[f].split('|'));
        //llenar[f] = arr_d[f].split('|');
      //  filas = arr_d[1].split('|');
      };*/
      console.log(filas);
      let matriz = [];
      let matriz2 = [];
      let matriz3 = [];
    //////////////
    /*
    let dato = "";
    for (const element of filas){
    dato = element[0];
      console.log(dato);
    };*/
    //var x = 10;
    var j = -1;
    console.log(filas.length);
    var num_filas = filas.length;
    let resultado = {} as any;
    let Dat = {} as Output;
    
    for (var i = 0; i <columnas.length ; i++) {
          //matriz[i] = columnas[i]// + ',' + filas[i]; //.push([columnas[i] ],[ filas[i]]);
         // matriz[i] = columnas[i].concat(filas[i]);
          let dato = "";
         /* if (num_filas > 1){
            let resultado +''+ (num_filas-1) = {} as any;
          }
          */
          matriz.push(columnas[i])
          for (const element of filas){
          dato = element[0];
            //console.log(dato);
            resultado[columnas[i]] = element[i];
           // matriz2.push(element[i]);
          };
          //Dat = resultado;
          //Dat_Viajes = resultado;
          //matriz2[i] = matriz
         // console.log(matriz)
/*
         var elementos = {
          'cod1': [],
          'cod2': [],
          'cod3': [],
          'cod4': []
        } as any;
        var cod;
        for (cod in elementos){
          var limite = Math.round(Math.random()*10)+1;// Cambiar por la búsqueda
          while (limite--)
            elementos[cod].push(Math.round(Math.random()*50));
        }
        //Para asegurarnos que se guardó
        for (cod in elementos)
          console.log(elementos[cod]);
          */
      };
      console.log(resultado);
      return resultado
      //ele_pru: Dat_Viajes[] =[resultado];
    }; 
  
    reader.onerror = function() {
      console.log(reader.error);
    };
    //-----------------------------------------------------------------------//
    /*ELEMENT_DATA2: Dat_Viajes[] = [
      {ID: 1, PLACA: 'ABD001', DNI: 9156666522, TRIPS: 50, PRODUCTID: 85},
      {ID: 2, PLACA: 'GNW0791', DNI: 918596522, TRIPS: 48, PRODUCTID: 14},
      {ID: 3, PLACA: 'OBM619', DNI: 91596666522, TRIPS: 12, PRODUCTID: 18},
    ];
    displayedColumns2: string[] = ['ID', 'PLACA', 'DNI', 'TRIPS', 'PRODUCTID'];
    dataSource2 = this.ELEMENT_DATA2;*/
  }
  
    //-----------------------------------------------------------------------//
  @ViewChild('barChart') barChart: ElementRef;
  drawChart = () => {
    const data = google.visualization.arrayToDataTable([
      ['Placa', 'Viajes', { role: 'style' } ],
      ['ABD001', 50, '#541810'],
      ['GNW0791',45, '#C70039'],
      ['OBM619', 12, '#FFC300'],
      ['CBM412', 24, '#900C3F']
    ]);
    
    const options = {
      title: 'Bar Chart',
      width: 400,
      height: 250,
      bar: {groupWidth: '95%'},
      legend: { position: 'none' },
    };
    const view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
      { calc: 'stringify',
        sourceColumn: 1,
        type: 'string',
        role: 'annotation' },
      2]);
    const chart = new google.visualization.BarChart(this.barChart.nativeElement);
    chart.draw(view, options);
  }

  ngAfterViewInit(): void {
    google.charts.load('current', {packages: ['corechart', 'bar'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }

  //private sanitizer: DomSanitizer
  constructor(private http: HttpClient) {
   // this.titulo = "Estadisticas de Viajes por Placas";
    this.contenido ="DC-Componente";
    //this.previsualizacion ="";
    console.log("component graph load!!")
    //this.barChart = ElementRef;
    // this.resultado = Dat;
   }

  ngOnInit(): void {
   // this.datos = resultado;
  }
    //public previsualizacion: string;
     
    //public arr3: any = ['{ID: 1,','PLACA: 2,','DNI: 3,','TRIPS: 4,','PRODUCTID: 5}'];
    //ELEMENT_DATA: Datatrip[] = ['{ID: 1, PLACA: ABD001, DNI: 9156666522, TRIPS: 50, PRODUCTID: 85}'];
    

    ELEMENT_DATA: Datatrip[] = [
     //this.resultado
     //{ID: 1, PLACA: 'ABD001', DNI: 9156666522, TRIPS: 50, PRODUCTID: 85},
     //{ID: 2, PLACA: 'GNW0791', DNI: 918596522, TRIPS: 48, PRODUCTID: 14},
     //{ID: 3, PLACA: 'OBM619', DNI: 91596666522, TRIPS: 12, PRODUCTID: 18}
    ];
    displayedColumns: string[] = ['ID', 'PLACA', 'DNI', 'TRIPS', 'PRODUCTID'];
    dataSource = this.ELEMENT_DATA;

 
}
