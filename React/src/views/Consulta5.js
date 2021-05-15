import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';


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


class Consulta1 extends Component {
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

  render(){
      const { archivo } = this.state;
      console.log(archivo);
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
      console.log(this.state.countr);
      console.log(this.state.datos);

      return (
          <div className="App">
          <h1>Los últimos cinco vacunados almacenados por país, en MongoDB</h1>
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
          <BootstrapTable keyField='id' data={ archivo.reverse() } columns={ columns } />
          </div>
      );
  }
}

export default Consulta1;