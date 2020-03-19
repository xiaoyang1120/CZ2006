import GoogleMapReact from 'google-map-react';
import React, { Component } from 'react';
const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 1.36,
      lng: 103.84
    },
    zoom: 11.8
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: '' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent lat={1.36} lng={103.84} text='My Marker' />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
