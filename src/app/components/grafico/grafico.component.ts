import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
//import { Chart } from 'chart.js';
import { Chart } from 'node_modules/chart.js';
//import { DomSanitizer } from '@angular/platform-browser';
import { Datatrip, Dat_Viajes } from '../../models/table'

declare var google: any;

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit, AfterViewInit {
  public contenido: string;
  public archivos: any = [];
  http2: any;
 
@ViewChild('barChart') barChart: ElementRef;
drawChart = () => {
  const data = google.visualization.arrayToDataTable([
    ['Placa', 'Viajes', { role: 'style' }],
    ['ABD001', 50, 'blue'],
    ['GNW079', 45, 'blue'],
    ['OBM619', 12, 'blue'],
    ['DCC512', 24, 'blue'],
    ['WQA911', 75, 'blue'],
    ['MKJ455', 20, 'blue'],
    ['LKM365', 5, 'blue'],
    ['NHJ785', 32, 'blue'],
    ['HJK232', 40, 'blue'],
    ['POI178', 22, 'blue']
  ]);

  const options = {
    title: 'Estadisticas por Placa',
    width: 650,
    height: 350,
    bar: { groupWidth: '95%' },
    legend: { position: 'none' },
  };
  const view = new google.visualization.DataView(data);
  view.setColumns([0, 1,
    {
      calc: 'stringify',
      sourceColumn: 1,
      type: 'string',
      role: 'annotation'
    },
    2]);
  const chart = new google.visualization.BarChart(this.barChart.nativeElement);
  chart.draw(view, options);
}
readFile(event: any) {
  const archivoCapturado = event.target.files[0]
  let reader = new FileReader();

  // reader.readAsText(file);
  let dat2 = reader.readAsText(archivoCapturado);
  reader.onload = function (e) {
    //
    //let dat: string | ArrayBuffer | null;      
    let dat = reader.result as any;
    //console.log(dat);

    let arr = [];
    arr = dat.split('\n')

    //["ID|PLACA|DNI|TRIPS|PRODUCTID", "545|ABD001|9156666522|50|85"]
    let arregloText = arr.toString();

    var arregloText2 = arregloText.replace(/\n|\r/g, "");
    let arr_d = [];
    arr_d = arregloText2.split(',')

    let columnas = [];

    columnas = arr_d[0].split('|');
    console.log(columnas);

    let llenar = [];
    var long = arr_d.length
    for (var f = 1; f < long; f++) {
      llenar.push(arr_d[f].split('|'));
    };
    //llenar.toString;
    let filas = [];
    filas = llenar;

    console.log(filas);
    let matriz = [];
    let matriz2 = {} as any;

    var num_filas = filas.length;
    let resultado = {} as any;
    let Dat = {} as Output;
    var iteracion = columnas.length * num_filas;
    let contador = 0;
    for (var i = 0; i < num_filas; i++) {
      for (var j = 0; j < columnas.length; j++) {
        //matriz.push(columnas[x])
        for (const element of filas) {
             resultado[columnas[j]] = element[j];
        }
        //Eliminar el primer elemento de un Array
        //filas.shift();
        matriz2[i] = resultado;
      };

      const chartLable = ['ID','PLACA','DNI','TRIPS','PRODUCTID'] as any;
      const chartDetails = [1,4,3,7,9] as any;
      //const canvas = document.getElementById('myChart') as HTMLCanvasElement;
      //const ctx  = canvas.getContext('2d');
      //const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!;
      //var Chart = require('chart.js');
      var myChart = new Chart("myChart", {
        type: 'bar',
        data: {
          labels: chartLable,
          datasets: [{
            label: 'Estadisticas viajes',
            data: chartDetails, //matriz2,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: {
              //type: 'bar',
                beginAtZero: true,
                max : 50,
                min : 0
              
            }
          }
        }
      });

  };
  console.log(matriz2);
  console.log(resultado);
  return matriz2;
};
reader.onerror = function () {
  console.log(reader.error);
};

}

ngAfterViewInit(): void {
  google.charts.load('current', { packages: ['corechart', 'bar'] });
  google.charts.setOnLoadCallback(this.drawChart);
}

constructor(private http: HttpClient) {
  this.contenido = "";
  console.log("graph load!!")
  localStorage.setItem('numeroCuentas', '0');
}

ngOnInit(): void {
}

ELEMENT_DATA: Datatrip[] = [
  { ID: 1, PLACA: 'ABD001', DNI: 9156666522, TRIPS: 50, PRODUCTID: 85 },
  {ID: 2, PLACA: 'GNW0791', DNI: 918596522, TRIPS: 48, PRODUCTID: 14},
  {ID: 3, PLACA: 'OBM619', DNI: 91596666522, TRIPS: 12, PRODUCTID: 18},
  {ID: 4, PLACA: 'DCC512', DNI: 91596666522, TRIPS: 24, PRODUCTID: 15},
  {ID: 5, PLACA: 'WQA911', DNI: 91596666522, TRIPS: 75, PRODUCTID: 10},
  {ID: 6, PLACA: 'MKJ455', DNI: 91596666522, TRIPS: 20, PRODUCTID: 56},
  {ID: 7, PLACA: 'LKM365', DNI: 91596666522, TRIPS: 5, PRODUCTID: 32},
  {ID: 8, PLACA: 'NHJ785', DNI: 91596666522, TRIPS: 32, PRODUCTID: 20},
  {ID: 9, PLACA: 'HJK232', DNI: 91596666522, TRIPS: 40, PRODUCTID: 10},
  {ID: 10, PLACA: 'POI178', DNI: 91596666522, TRIPS: 22, PRODUCTID: 65}
];
displayedColumns: string[] = ['ID', 'PLACA', 'DNI', 'TRIPS', 'PRODUCTID'];
dataSource = this.ELEMENT_DATA;


}

