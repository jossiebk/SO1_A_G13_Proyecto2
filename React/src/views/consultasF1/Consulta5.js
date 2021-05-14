import React, { Component } from "react";
import CanvasJSReact from "../assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Consulta5 extends Component {
  constructor() {
    super();
    this.state = {
      archivo: [],
      parseado: [],
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
    var infectados = {};
    const { archivo } = this.state;
    console.log(archivo);
    console.log(archivo.length);
    for (var i = 0; i < archivo.length; i++) {
      if (!(archivo[i].infectedtype in infectados)) {
        infectados[archivo[i].infectedtype] = 1;
      } else {
        infectados[archivo[i].infectedtype] += 1;
      }
      console.log(archivo[i].infectedtype);
    }
    console.log(infectados);
    console.log(infectados.key);
    console.log(infectados.value);

    var todo = [];
    for (var key in infectados) {
      if (infectados.hasOwnProperty(key)) {
        var porcentaje = (infectados[key] * 100) / archivo.length;
        var entra = { y: porcentaje, label: key };
        todo.push(entra);
      }
    }

    const options = {
      exportEnabled: true,
      animationEnabled: true,
      title: {
        text:
          "Gráfico circular del porcentaje de casos infectados por infectedType.",
      },
      data: [
        {
          type: "pie",
          startAngle: 75,
          toolTipContent: "<b>{label}</b>: {y}%",
          showInLegend: "true",
          legendText: "{label}",
          indexLabelFontSize: 16,
          indexLabel: "{label} - {y}%",
          dataPoints: todo,
        },
      ],
    };

    return (
      <div>
        <h1>Grupo_13</h1>
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}

export default Consulta5;
