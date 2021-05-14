import React, { Component } from "react";
import CanvasJSReact from "../assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Consulta4 extends Component {
  constructor() {
    super();
    this.state = {
      archivo: [],
    };
  }

  componentDidMount() {
    try {
      fetch("http://34.69.47.240:80/data")
        .then((response) => response.json())
        .then((datos) => {
          this.setState({ archivo: datos });
        });
    } catch {}
  }
  render() {
    let infectados = {};
    const { archivo } = this.state;
    console.log(archivo);
    console.log(archivo.length);

    for (var i = 0; i < archivo.length; i++) {
      if (!(archivo[i].state in infectados)) {
        infectados[archivo[i].state] = 1;
      } else {
        infectados[archivo[i].state] += 1;
      }
    }
    console.log(infectados);

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
        text: "Gráfico circular del porcentaje de casos infectados por State.",
      },
      data: [
        {
          type: "pie",
          startAngle: 90,
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
        <h1>Grupo 13</h1>
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}

export default Consulta4;
