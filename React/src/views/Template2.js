import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';


import {
  Route,
  NavLink,
  BrowserRouter
} from "react-router-dom";

import ChartWithZoom from "./overview/Chart with Zoom";

import ColumnChart from "./column charts/Column Chart";
import PieChart from "./pie & funnel charts/Pie Chart";
import PieChartWithCustomization from "./pie & funnel charts/Pie Chart with Customization";
import './bootstrap.min.css'; 
import BootstrapTable from 'react-bootstrap-table-next';
import Consulta1 from './Consulta1';
import Consulta2 from './Consulta2';
import Consulta3 from './Consulta3';
import Consulta4 from './Consulta4';
import Consulta5 from './Consulta5';
import Consulta6 from './Consulta6';
import Consulta7 from './Consulta7';

const person = [
    {id: 1, name: 'Gob', value: '2'},
    {id: 2, name: 'Buster', value: '5'},
    {id: 3, name: 'George Michael', value: '4'}
  ];
  const columns = [{
    dataField: 'id',
    text: 'PID'
  },
  {
    dataField: 'name',
    text: 'Name'
  },
  {
    dataField: 'value',
    text: 'Father PID'
  },
  {
    dataField: 'value',
    text: 'Status'
  }];


class Template extends Component {  
  render() {    
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <button className="d-lg-none toggle-sidebar"><span className="navbar-toggler-icon"></span></button>
          <Navbar.Brand href="/">Grupo_13</Navbar.Brand><span className="hidden-xs text-muted"></span>
          </Navbar>		  
          <BrowserRouter>		  
            <Row>
              
              <Nav to="/" className="flex-sm-column" id="sidebar">
                <ListGroup className="nav nav-sidebar flex-sm-column">
                  <ListGroup.Item>
                    <a href="#overview" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><span>REPORTES</span></a>
                  </ListGroup.Item>
                  <ListGroup>
                    <ListGroup className="sub-menu collapse" id="overview">
                      <ListGroup.Item> <NavLink exact to="/Consulta1">Reporte1</NavLink></ListGroup.Item>
                      <ListGroup.Item> <NavLink exact to="/Consulta2">Reporte2</NavLink></ListGroup.Item>
                      <ListGroup.Item> <NavLink exact to="/Consulta3">Reporte3</NavLink></ListGroup.Item>
                      <ListGroup.Item> <NavLink exact to="/Consulta4">Reporte4</NavLink></ListGroup.Item>
                      <ListGroup.Item> <NavLink exact to="/Consulta5">Reporte5</NavLink></ListGroup.Item>
                      <ListGroup.Item> <NavLink exact to="/Consulta6">Reporte6</NavLink></ListGroup.Item>
                      <ListGroup.Item> <NavLink exact to="/Consulta7">Reporte7</NavLink></ListGroup.Item>
                    </ListGroup>
                  </ListGroup>
                </ListGroup>
              </Nav>
              
              <Col xl={{ span: 7, offset: 3 }} lg={{ span: 8, offset: 3 }} xs={{ span: 8, offset: 2 }}>
                <Container>
                  <div className="content">
                    <Route exact path="/" component={ColumnChart}/>
                    <Route exact path="/Consulta1" component={Consulta1}/>
                    <Route exact path="/Consulta2" component={Consulta2}/>
                    <Route exact path="/Consulta3" component={Consulta3}/>
                    <Route exact path="/Consulta4" component={Consulta4}/>
                    <Route exact path="/Consulta5" component={Consulta5}/>
                    <Route exact path="/Consulta6" component={Consulta6}/>
                    <Route exact path="/Consulta7" component={Consulta7}/>
                  </div>
                </Container>
              </Col>					
            </Row>			
          </BrowserRouter>	
        </div>
    );
  }
}

export default Template;