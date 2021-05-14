
import React, { Component } from 'react';
import './bootstrap.min.css'; 
import BootstrapTable from 'react-bootstrap-table-next';
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const data = [];


class Reporte3 extends Component{

  constructor() {
      super();
      this.state = {
        datos: []
      };
  }

  componentDidMount() {
    fetch("http://34.69.47.240/data")
    .then((response) => response.json())
    .then((res) => this.setState({ datos : res}));
  }

    render() {
    const { datos } = this.state;
    console.log(datos)

    const cats = datos.reduce((datos, { location, name }) => {
      if (!datos[location]) datos[location] = [];
      datos[location].push(name);
      return datos;
    }, {});

    console.log(JSON.stringify(cats))
    var count = Object.keys(cats).length;
    console.log(count)

    console.log(Object.keys(cats).length); // console: ['0', '1', '2']
    var array_objetos = [];
    Object.keys(cats).forEach(key => {
      console.log(key, cats[key]);
      console.log(cats[key].length);
      var elemento = {departamento: key.toString().replace(/['"]+/g, ''), tam: cats[key].length}
      if(key != "undefined")
        array_objetos.push(elemento)
    });

    array_objetos.sort(function(a, b) {
      var textA = a.tam;
      var textB = b.tam;
      return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
    });
    console.log(array_objetos[0])
    var dep1 = array_objetos[0]
    var dep2 = array_objetos[1]
    var dep3 = array_objetos[2]
    var dep4 = array_objetos[3]
    var dep5 = array_objetos[4]
    var tam1 , nombre1 = "";
    var tam2 , nombre2 = "";
    var tam3 , nombre3 = "";
    var tam4 , nombre4 = "";
    var tam5 , nombre5 = "";
    if(dep1 != undefined){
      tam1 = dep1.tam;
      nombre1 = dep1.departamento;
    }
    if(dep2 != undefined){
      tam2 = dep2.tam;
      nombre2 = dep2.departamento;
    }
    if(dep3 != undefined){
      tam3 = dep3.tam;
      nombre3 = dep3.departamento;
    }
    if(dep4 != undefined){
      tam4 = dep4.tam;
      nombre4 = dep4.departamento;
    }
    if(dep5 != undefined){
      tam5 = dep5.tam;
      nombre5 = dep5.departamento;
    }
    var dataPoint;
		var total;
		const options = {
			animationEnabled: true,
			title:{
				text: "Top 5 departamentos infectados."
			},
			data: [{
				type: "funnel",
				toolTipContent: "<b>{label}</b>: {y} <b>({percentage}%)</b>",
				indexLabelPlacement: "inside",
				indexLabel: "{label} ({percentage}%)",
				dataPoints: [
					{ y: tam1 , label: nombre1 },
					{ y: tam2 , label: nombre2 },
					{ y: tam3 , label: nombre3 },
					{ y: tam4 , label: nombre4 },
					{ y: tam5 , label: nombre5 },
				]
			}]
		}
		//calculate percentage
		dataPoint = options.data[0].dataPoints;
		total = dataPoint[0].y;
		for(var i = 0; i < dataPoint.length; i++) {
			if(i == 0) {
				options.data[0].dataPoints[i].percentage = 100;
			} else {
				options.data[0].dataPoints[i].percentage = ((dataPoint[i].y / total) * 100).toFixed(2);
			}
		}
		return (
			<div>
				<CanvasJSChart options = {options}
					 onRef={ref => this.chart = ref}
				/>
				{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			</div>
		);

    }

}


export default Reporte3;