import React, { Component } from "react";
import "./bootstrap.min.css";
import BootstrapTable from "react-bootstrap-table-next";

const columns = [
  {
    dataField: "PROC_ID",
    text: "Identificador de procesos PID",
  },
  {
    dataField: "PROC_NAME",
    text: "Nombre del Proceso",
  },
  {
    dataField: "USER_ID",
    text: "Usuario que ejecutó",
  },
  {
    dataField: "PARENT_ID",
    text: "Padre del proceso",
  },
  {
    dataField: "STATE",
    text: "Estado",
  },
];

class Consulta8 extends Component {
  constructor() {
    super();
    this.state = {
      archivo: "",
    };
  }
  componentDidMount() {
    try {
      fetch("http://34.69.47.240:80/proc")
        .then((response) => response.text())
        .then((datos) => {
          this.setState({ archivo: datos });
        });
    } catch {
      console.log("API is not reachable");
    }
  }

  render() {
    const { archivo } = this.state;
    let procesos = [];

    let procesos_text = archivo.replace(/,\s*$/, "");
    let procesos_json = JSON.parse("[".concat(procesos_text).concat("]"));
    console.log(procesos_json);

    for (var i = 0; i < procesos_json.length; i++) {
      procesos.push(procesos_json[i]);
    }

    return (
      <div className="App">
        <BootstrapTable keyField="PROC_ID" data={procesos} columns={columns} />
      </div>
    );
  }
}

export default Consulta8;
