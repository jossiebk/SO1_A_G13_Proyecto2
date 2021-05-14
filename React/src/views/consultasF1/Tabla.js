import React, { Component } from "react";
import "./bootstrap.min.css";
import BootstrapTable from "react-bootstrap-table-next";

const person = [
  { id: 1, name: "Gob", value: "2" },
  { id: 2, name: "Buster", value: "5" },
  { id: 3, name: "George Michael", value: "4" },
];
const columns = [
  {
    dataField: "id",
    text: "PID",
  },
  {
    dataField: "name",
    text: "Name",
  },
  {
    dataField: "value",
    text: "Father PID",
  },
  {
    dataField: "value",
    text: "Status",
  },
];

class Tabla extends Component {
  render() {
    return (
      <div className="App">
        <p className="Table-header">Basic Table</p>

        <BootstrapTable keyField="id" data={person} columns={columns} />
      </div>
    );
  }
}

export default Tabla;
