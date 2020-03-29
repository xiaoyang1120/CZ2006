import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

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

  render(){
    return(
      <div>
        <Map google={this.props.google} zoom={14}>
          <Marker onClick={this.onMarkerClick}
                  name={'Current location'} />

        </Map>
      </div>
    )
  }
}


export default withStyles(styles)(MapDisplay);
