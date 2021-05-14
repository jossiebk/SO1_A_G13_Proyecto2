
import React, { Component } from 'react';
import './bootstrap.min.css'; 
import BootstrapTable from 'react-bootstrap-table-next';
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const data = [];


class Reporte9 extends Component{

  constructor() {
      super();
      this.state = {
        datos: []
      };
  }

  componentDidMount() {
    fetch("http://34.69.47.240/mem")
    .then((response) => response.json())
    .then((res) => this.setState({ datos : res}));
  }

    render() {
      const { datos } = this.state;
      console.log(datos)
      var  MemLibre = datos['MemoriaLibre']
      var MemTotal = datos['MemoriaTotal']
      var porcentaje  = datos['PorcentajeConsumo']

      const options = {
        animationEnabled: true,
        title: {
          text: "Gráfico de dona del porcentaje de utilización de la RAM."
        },
        subtitles: [{
          text: porcentaje + "% Positive",
          verticalAlign: "center",
          fontSize: 24,
          dockInsidePlotArea: true
        }],
        data: [{
          type: "doughnut",
          showInLegend: true,
          indexLabel: "{name}: {y}",
          yValueFormatString: "#,###''",
          dataPoints: [
            { name: "Usado", y: MemTotal-MemLibre },
            { name: "Sin usar", y: MemLibre }
          ]
        }]
      }

      const person = [
        {name: 'Memoria Total', value: MemTotal},
        {name: 'Memoria Libre', value: MemLibre},
        {name: 'PorcentajeConsumo', value: porcentaje }
      ];
      
      const columns = [
      {
        dataField: 'name',
        text: 'Nombre'
      },
      {
        dataField: 'value',
        text: 'Valor'
      }];

      return (
      <div>
        <CanvasJSChart options = {options}
          /* onRef={ref => this.chart = ref} */
        />
        
        <p className="Table-header">Reporte 9</p>
        <BootstrapTable keyField='id' data={ person } columns={ columns } />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
      );
    }
}


export default Reporte9;