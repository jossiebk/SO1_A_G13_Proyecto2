
import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
const data = [{"pk": 1, "model": "socios.pais","latitud": 13.0, "nombre": "KNicaragua", "longitud": -85.0}, 
                {"pk": 2, "model": "socios.pais", "latitud": 9.95, "nombre": "KCosta Rica", "longitud": -84.0}, 
                {"pk": 3, "model": "socios.pais", "latitud": 14.1, "nombre": "KHonduras", "longitud": -87.2167}, 
                {"pk": 4, "model": "socios.pais", "latitud": 13.6689, "nombre": "KEl salvador", "longitud": -88.8661}, 
                {"pk": 5, "model": "socios.pais", "latitud": 15.0, "nombre": "KGuatemala", "longitud": -90.25}];

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
          <AnyReactComponent
            lat={15.0}
            lng={-90.35}
            text="cantidad de infectados"
            icon={
              url= "https://cdn.icon-icons.com/icons2/1336/PNG/512/maplocator_87218.png",
              scaledSize= new window.google.maps.Size(10, 10)
            }
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default Consulta7;

