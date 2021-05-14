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
          archivo: [],
          paraTabla: [],
          datos: []
        };
      } 
  
    componentDidMount() {
      fetch("http://127.0.0.1:7000/data")
      .then((response) => response.json())
      .then((res) => this.setState({ datos : res}));
    }

/*
    componentDidMount() {
        fetch("127.0.0.1:7000/data")
          .then((response) => response.json())
          .then((datos) => {
            console.log("entro a data");
            console.log(datos);
            this.setState({archivo:datos});
          })
        const { archivo } = this.state;
        console.log(archivo);
    }
*/




    render(){
        const { datos } = this.state;
        console.log(datos)
        const { archivo } = this.state;
        console.log(archivo);
        return (
            <div className="App">
            <h1>Todos los datos</h1>
            <BootstrapTable keyField='id' data={ datos.reverse() } columns={ columns } />
            </div>
        );
    }
}


export default Consulta1;