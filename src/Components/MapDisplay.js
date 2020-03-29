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
      <div style={{ height: '75%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: '', language: 'en' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent lat={1.36} lng={103.84} text='My Marker' />
        </GoogleMapReact>
      </div>
    )
  }
}


export default withStyles(styles)(MapDisplay);
