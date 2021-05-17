
import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 

const data = [{"pk": 1, "model": "socios.pais","latitud": 13.0, "nombre": "Casos en Nicaragua", "longitud": -85.0}, 
                {"pk": 2, "model": "socios.pais", "latitud": 9.95, "nombre": "Casos en Costa Rica", "longitud": -84.0}, 
                {"pk": 3, "model": "socios.pais", "latitud": 14.1, "nombre": "Casos en Honduras", "longitud": -87.2167}, 
                {"pk": 4, "model": "socios.pais", "latitud": 13.6689, "nombre": "Casos en El salvador", "longitud": -88.8661}, 
                {"pk": 5, "model": "socios.pais", "latitud": 15.0, "nombre": "Casos en Guatemala", "longitud": -90.25},
                {"pk": 6, "model": "socios.pais", "latitud": 56.13, "nombre": "Casos en Canada", "longitud": -106.34},
                {"pk": 7, "model": "socios.pais", "latitud": -14.23, "nombre": "Casos en Brasil", "longitud": -51.92},
                {"pk": 8, "model": "socios.pais", "latitud": 55.37, "nombre": "Casos en Inglaterra", "longitud": -3.43},
                {"pk": 9, "model": "socios.pais", "latitud": 40.46, "nombre": "Casos en España", "longitud": -3.74},  
                {"pk": 10, "model": "socios.pais", "latitud": 23.63, "nombre": "Casos en Mexico", "longitud": -102.55}];

class Consulta7 extends Component {  
  static defaultProps = {
    center: {
      lat: 15.0,
      lng: -90.25
    },
    zoom: 5
  };
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyD9irghTKKirpKWwWe-OBwBk-zXQqi0kpI' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {
            data.map(item => (
            <AnyReactComponent
              text={item.nombre}
              lng={item.longitud}
              lat={item.latitud}
            />
          ))}
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default Consulta7;

