import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import CanvasJSReact from "../assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

  const columns = [
    {
    dataField: 'name',
    text: 'NOMBRE'
  },
  {
    dataField: 'location',
    text: 'UBICACION'
  },
  {
    dataField: 'age',
    text: 'EDAD'
  },
  {
    dataField: 'infectedtype',
    text: 'TIPO'
  },
  {
    dataField: 'state',
    text: 'ESTADO'
  },
  {
    dataField: 'CAMINO',
    text: 'CAMINO'
  }
];


class Consulta4 extends Component {
    constructor(){
        super();
        this.state = {
          paraTabla: [],
          value: '',
          archivo: [],
          range: [],
          datos: [],
          paises: [],
          countr: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      } 

      componentDidMount() {
        fetch("http://127.0.0.1:7000/data")
        .then((response) => response.json())
        .then((res) => this.setState({ datos : res}));
      }
  

    handleChange(event) {
      console.log(event.target.value);
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('Your favorite flavor is: ' + this.state.value);
      event.preventDefault();
    }

    render() {
      let n = 0;
      let infectados = {};
      //vamos a dividir por pais: 
      for(let y = 0; y < this.state.datos.length; y++)
      {
        if (!this.state.paises.includes(this.state.datos[y]['location'])){
          this.state.paises[n]= this.state.datos[y]['location'];
          n++;
        }
      }
      //convertimos a lista de objetos 

      for(let y = 0; y < this.state.paises.length; y++)
      {
        this.state.countr[y] = {location: this.state.paises[y]};
      }
      console.log(this.state.countr);
      console.log(this.state.datos);

      for (var i = 0; i < this.state.datos.length; i++) {
        if(this.state.value == this.state.datos[i]['location']){
          if (!(this.state.datos[i].state in infectados)) {
            infectados[this.state.datos[i].state] = 1;
          } else {
            infectados[this.state.datos[i].state] += 1;
          }
        }
      }
      console.log(infectados);
  
      var todo = [];
      for (var key in infectados) {
        if (infectados.hasOwnProperty(key)) {
          var porcentaje = (infectados[key] * 100) / this.state.datos.length;
          var entra = { y: porcentaje, label: key };
          todo.push(entra);
        }
      }
  
      const options = {
        exportEnabled: true,
        animationEnabled: true,
        title: {
          text: "Gráfica de pie de los géneros de los vacunados por país",
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
          <form onSubmit={this.handleSubmit}>
            <label>
              Pais a seleccionar:
              <br>
              </br>
              <div>
              <select value={this.state.value} onChange={this.handleChange}>
                {this.state.countr.map((option) => (
                  <option value={option.location}>{option.location}</option>
                ))}
              </select>
              </div>
            </label>
          </form>
          <CanvasJSChart
            options={options}
          />
        </div>
      );
    }
  }
  


export default Consulta4;