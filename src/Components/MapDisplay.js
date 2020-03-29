import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import GoogleMapReact from 'google-map-react';
import RoomIcon from '@material-ui/icons/Room';

//const AnyReactComponent = ({ text }) => <div>{text}</div>;

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
      <div style={{ height: '70%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: '', language: 'en' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <RoomIcon
            lat={1.36}
            lng={103.84}
            color="primary"
            style={{ fontSize: 30 }} />
        </GoogleMapReact>
      </div>
    )
  }
}


export default withStyles(styles)(MapDisplay);
