import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
import ChartWithZoom from "../overview/Chart with Zoom";
var Chart = ChartWithZoom.CanvasJSChart;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class PieChartWithCustomization extends Component {
	render() {
		const options = {
			theme: "dark2",
			animationEnabled: true,
			exportFileName: "New Year Resolutions",
			exportEnabled: true,
			title:{
				text: "Top Categories of New Year's Resolution"
			},
			data: [{
				type: "pie",
				showInLegend: true,
				legendText: "{label}",
				toolTipContent: "{label}: <strong>{y}%</strong>",
				indexLabel: "{y}%",
				indexLabelPlacement: "inside",
				dataPoints: [
					{ y: 32, label: "Health" },
					{ y: 22, label: "Finance" },
					{ y: 15, label: "Education" },
					{ y: 19, label: "Career" },
					{ y: 5, label: "Family" },
					{ y: 7, label: "Real Estate" }
				]
			}]
		}
		
		return (
		<div>
			<h1>Grupo_13</h1>
			<CanvasJSChart options = {options}
		/* onRef={ref => this.chart = ref} */
		/>
  		</div>
		);
	}
}

export default PieChartWithCustomization;