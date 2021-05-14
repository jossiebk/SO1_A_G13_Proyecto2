import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dps = [{x: 1, y: 10}, {x: 2, y: 13}, {x: 3, y: 18}, {x: 4, y: 20}, {x: 5, y: 17},{x: 6, y: 10}, {x: 7, y: 13}, {x: 8, y: 18}, {x: 9, y: 20}, {x: 10, y: 17}];   //dataPoints.
var xVal = dps.length + 1;
var yVal = 15;
var updateInterval = 1000;

class DynamicRam extends Component 
{
	state = {
        file: [],
        range: [],
    };

	constructor() {
		super();
		this.updateChart = this.updateChart.bind(this);
	}
	
	// componentDidMount() {
	// 	setInterval(this.updateChart, updateInterval);
	// }

    componentDidMount() {
		fetch("http://34.69.47.240/mem",)
		  .then((response) => response.json())
		  .then((datos) => this.setState({file : datos}))
		  setInterval(this.updateChart, updateInterval);
	}

	updateChart() {
		console.log(this.state.file);
		//yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
		yVal = this.state.file['PorcentajeConsumo'];
		dps.push({x: xVal,y: yVal});
		xVal++;
		if (dps.length >  10 ) {
			dps.shift();
		}
		this.chart.render();
	}
	
	render() {
		const options = {
			theme: "light3",
			exportEnabled: true,
			title :{
				text: "RAM"
			},
			axisX: {
				title: "Segundos",
				suffix: "s"
			},
            axisY: {
				title: "Porcentaje de Uso",
				suffix: "%"
			},
			data: [{
				type: "area",
				dataPoints : dps
			}]
		}

		return (
		<div>
            
			<h1>CONSUMO DE MEMORIA</h1>
            
			{ <CanvasJSChart options = {options} 
				onRef={ref => this.chart = ref}
			/>}
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default DynamicRam;