import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;





class ConsultaJossie extends Component {
    constructor(){
        super();
        this.state = {
          archivo: [],
          parseado: []
        };
      } 

    componentDidMount() {
        fetch("http://34.69.47.240:80/data")
          .then((response) => response.json())
          .then((datos) => {
            console.log(datos);
            this.setState({archivo:datos});
          })
    }
	render() {
        var regiones={
            Suroccidente:0,
            Metropolitana:0,
			Noroccidente:0,
			Central:0,
			Verapaz:0,
            Nororiente:0,
            Suroriente:0,
            Peten:0,
            NiIdea:0
        };
        const { archivo } = this.state;
        console.log(archivo);
        for(var i=0;i<archivo.length;i++){
            if(archivo[i].location == "Quetzaltenango" || archivo[i].location == "Retalhuleu" || archivo[i].location == "San Marcos" || archivo[i].location == "Suchitepequez" || archivo[i].location == "Sololá" || archivo[i].location == "Totonicapán"){
                regiones["Suroccidente"]+=1;
            }
            else if(archivo[i].location == "Guatemala"){
                regiones["Metropolitana"]+=1;
            }
            else if(archivo[i].location == "Huehuetenango" || archivo[i].location == "Quiché"){
                regiones["Noroccidente"]+=1;
            }
            else if(archivo[i].location == "Chimaltenago" || archivo[i].location == "Sacatepequez" || archivo[i].location == "Escuintla"){
                regiones["Central"]+=1;
            }
            else if(archivo[i].location == "Alta Verapaz" || archivo[i].location == "QuiBaja Verapazché"){
                regiones["Verapaz"]+=1;
            }
            else if(archivo[i].location == "Chiquimula" || archivo[i].location == "El Progreso" || archivo[i].location == "Izabal" || archivo[i].location == "Zacapa"){
                regiones["Nororiente"]+=1;
            }
            else if(archivo[i].location == "Jutiapa" || archivo[i].location == "Jalapa" || archivo[i].location == "Santa Rosa"){
                regiones["Suroriente"]+=1;
            }
            else if(archivo[i].location == "Peten"){
                regiones["Peten"]+=1;
            }		
            else {
                regiones["NiIdea"]+=1;
            }		
        }
        console.log(regiones);
		var maxKey = Object.keys(regiones).reduce(function(a, b){ return regiones[a] > regiones[b] ? a : b });
		console.log("el maximo es: ",maxKey);
        

		const options = {
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: "Región más infectada ==>    " + maxKey
			},
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}%",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y}%",
				dataPoints:  [
					
				]
			}]
		}
		

		return (
		<div>
			<h1>Grupo 13</h1>
           
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default ConsultaJossie;