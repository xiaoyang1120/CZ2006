import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const styles = theme => ({

})

class MapDisplay extends Component{
  constructor(props) {
    super(props);
    this.state = {
      //loading: true,
      //someobject: [],
    };
    //function binding
  }
  static defaultProps = {
    center: {
      lat: 1.36,
      lng: 103.84
    },
    zoom: 11.8,
  };

  render(){
    return(
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCjevUSZZlSad1G2HbuF_aAIOciqAjZrgc' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent lat={1.36} lng={103.84} text='My Marker' />
        </GoogleMapReact>
      </div>
    )
  }
}

// <Map google={this.props.google} zoom={14}>
//   <Marker onClick={this.onMarkerClick}
//           name={'Current location'} />
//
// </Map>

export default withStyles(styles)(MapDisplay);

// import GoogleMapReact from 'google-map-react';
// import React, { Component } from 'react';
// const AnyReactComponent = ({ text }) => <div>{text}</div>;
//
// class SimpleMap extends Component {
//   static defaultProps = {
//     center: {
//       lat: 1.36,
//       lng: 103.84
//     },
//     zoom: 11.8
//   };
//
//   render() {
//     return (
//       // Important! Always set the container height explicitly
//       <div style={{ height: '100vh', width: '100%' }}>
//         <GoogleMapReact
//           bootstrapURLKeys={{ key: '' }}
//           defaultCenter={this.props.center}
//           defaultZoom={this.props.zoom}
//         >
//           <AnyReactComponent lat={1.36} lng={103.84} text='My Marker' />
//         </GoogleMapReact>
//       </div>
//     );
//   }
// }
//
// export default SimpleMap;
