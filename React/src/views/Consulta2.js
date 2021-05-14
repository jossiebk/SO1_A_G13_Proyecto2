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
          paraTabla: []
        };
      } 

    componentDidMount() {
        fetch("http://127.0.0.1:7000/data")
          .then((response) => response.json())
          .then((datos) => {
            console.log(datos);
            this.setState({archivo:datos});
          })
        const { archivo } = this.state;
        console.log(archivo);
    }





    render(){
        const { archivo } = this.state;
        console.log(archivo);
        return (
            <div className="App">
            <h1>Los diez países más vacunados, en Redis.</h1>
            <BootstrapTable keyField='id' data={ archivo.reverse() } columns={ columns } />
            </div>
        );
    }
}


export default Consulta1;