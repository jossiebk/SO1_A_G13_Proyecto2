import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;





class Consulta2 extends Component {
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
            Region_Oriente:0,
            Peten:0,
			Franja_Transversal_del_Norte:0,
			Litoral_del_Pacifico:0,
			El_Resto:0

        };
        const { archivo } = this.state;
        console.log(archivo);
        for(var i=0;i<archivo.length;i++){
            if(archivo[i].location == "Zacapa" || archivo[i].location == "El Progreso" || archivo[i].location == "Chiquimula" || archivo[i].location == "Izabal" || archivo[i].location == "Jutiapa" || archivo[i].location == "Jalapa" || archivo[i].location == "Santa Rosa"){
                regiones["Region_Oriente"]+=1;
            }
            else if(archivo[i].location == "Peten"){
                regiones["Peten"]+=1;
            }
            else if(archivo[i].location == "Huehuetenango" || archivo[i].location == "Izabal" || archivo[i].location == "Alta Verapaz"){
                regiones["Franja_Transversal_del_Norte"]+=1;
            }
			else if(archivo[i].location == "Jutiapa" || archivo[i].location == "Santa Rosa" || archivo[i].location == "Escuintla" || archivo[i].location == "Suchitepequez" || archivo[i].location == "Retalhuleu" || archivo[i].location == "San Marcos" || archivo[i].location == "Quetzaltenango"){
                regiones["Litoral_del_Pacifico"]+=1;
            }
			else if(archivo[i].location == "Baja Verapaz" || archivo[i].location == "Chimaltenago" || archivo[i].location == "Guatemala" || archivo[i].location == "Quiché" || archivo[i].location == "Sacatepequez" || archivo[i].location == "Sololá" || archivo[i].location == "Totonicapán" ){
                regiones["El_Resto"]+=1;
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

export default Consulta2;