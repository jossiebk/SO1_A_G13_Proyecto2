import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import CanvasJSReact from '../assets/canvasjs.react';
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


class Consulta6 extends Component {
    constructor(){
      super();
      this.state = {
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
    

    
    handleChange(event) {
      console.log(event.target.value);
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('Your favorite flavor is: ' + this.state.value);
      event.preventDefault();
    }

    componentDidMount() {
      fetch("http://127.0.0.1:7000/data")
      .then((response) => response.json())
      .then((res) => this.setState({ datos : res}));
    }

 
    render() {  
      let n = 0;
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
      
      for(let x = 0; x < 10; x++)
      {
          this.state.range[x] = 0;
      }
  
      for(let y = 0; y < this.state.datos.length; y++)
      {
        if(this.state.datos[y]['location']==this.state.value){
          let e = this.state.datos[y]['age'];
          if(e != undefined)
          {
              if(e >=0 && e <10)
              {
                  this.state.range[0] = this.state.range[0] + 1;
              }
              else if(e >= 10 && e < 20)
              {
                  this.state.range[1] = this.state.range[1] + 1;
              }
              else if(e >= 20 && e < 30)
              {
                  this.state.range[2] = this.state.range[2] + 1;
              }
              else if(e >= 30 && e < 40)
              {
                  this.state.range[3] = this.state.range[3] + 1;
              }
              else if(e >= 40 && e < 50)
              {
                  this.state.range[4] = this.state.range[4] + 1;
              }
              else if(e >= 50 && e < 60)
              {
                  this.state.range[5] = this.state.range[5] + 1;
              }
              else if(e >= 60 && e < 70)
              {   
                  this.state.range[6] = this.state.range[6] + 1;
              }
              else if(e >= 70 && e < 80)
              {
                  this.state.range[7] = this.state.range[7] + 1;
              }
              else if(e >= 80 && e < 90)
              {
                  this.state.range[8] = this.state.range[8] + 1;
              }
              else if(e >= 90 && e < 100)
              {
                  this.state.range[9] = this.state.range[9] + 1;
              }
          }
        } 
      }
  console.log(this.state.range);
 
  const options = {
          exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Personas Infectadas"
    },
          axisX: {
      title: "Rango de Edades",
      suffix: ""
    },
          axisY: {
      title: "Cantidad Infectados",
      suffix: ""
    },
    data: [
    {
      // Change type to "doughnut", "line", "splineArea", etc.
      type: "column",
      dataPoints: [
        { label: "0-10",  y:  this.state.range[0] },
        { label: "10-20", y:  this.state.range[1] },
        { label: "20-30", y:  this.state.range[2] },
        { label: "30-40", y:  this.state.range[3] },
        { label: "40-50", y:  this.state.range[4] },
                  { label: "50-60", y:  this.state.range[5] },
        { label: "60-70", y:  this.state.range[6] },
        { label: "70-80", y:  this.state.range[7] },
        { label: "80-90", y:  this.state.range[8] },
        { label: "90-100", y: this.state.range[9] },
      ]
    }
    ]
  }  
  return (
  <div>
    <h1>Gráfica de barras del rango de edades (de diez en diez) por cada país</h1>
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
    <CanvasJSChart options = {options} 
    />
    </div>
  );
    }
  }

export default Consulta6;