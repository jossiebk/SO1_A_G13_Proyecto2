import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
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


class Consulta1C extends Component {
    constructor(){
        super();
        this.state = {
          archivo: [],
          paraTabla: []
        };
      } 

    componentDidMount() {
        fetch("http://34.69.47.240:80/data")
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
        const { paraTabla } = this.state;
        console.log(archivo);
        for(var i=0;i<archivo.length-1;i++){
            if(archivo[i].CAMINO=="GRPC"){
                paraTabla.push(archivo[i]);
            }
        }
        return (
            <div className="App">
            <h1>GRPC</h1>
            <BootstrapTable keyField='id' data={ paraTabla.reverse() } columns={ columns } />
            </div>
        );
    }
}


export default Consulta1C;