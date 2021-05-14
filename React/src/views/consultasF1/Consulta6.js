import React, { Component } from "react";
import "./bootstrap.min.css";
import BootstrapTable from "react-bootstrap-table-next";

const columns = [
  {
    dataField: "name",
    text: "Nombre",
  },
  {
    dataField: "location",
    text: "Ubicación",
  },
  {
    dataField: "age",
    text: "Edad",
  },
  {
    dataField: "infectedtype",
    text: "Infección",
  },
  {
    dataField: "state",
    text: "Estado",
  },
];

class Consulta6 extends Component {
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
    } catch {
      console.log("API is not reachable");
    }
  }

  render() {
    let personas = [];
    const { archivo } = this.state;

    console.log(archivo);
    console.log(archivo.length);

    for (let i = archivo.length - 1; i > archivo.length - 6; i--) {
      if (archivo[i] != undefined) {
        personas.push(archivo[i]);
      }
    }

    console.log(personas);

    return (
      <div className="App">
        <BootstrapTable keyField="_id" data={personas} columns={columns} />
      </div>
    );
  }
}

export default Consulta6;
