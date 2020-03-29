import React, { Component } from "react";
//import { withStyles } from "@material-ui/core/styles";
import GoogleMapReact from 'google-map-react';
import RoomIcon from '@material-ui/icons/Room';
import axios from "axios";

//const AnyReactComponent = ({ text }) => <div>{text}</div>;

class MapDisplay extends Component{
  constructor(props) {
    super(props);
    this.state = {
      currentDistrict:this.props.disId,
      zoom:12,
      center:{
        lat: 1.36,
        lng: 103.84,
      },
      //detail:{},
      //someobject: [],
    };
    //function binding
  //  this.queryFacility=this.queryFacility.bind(this);
  }

  componentDidMount() {
    //TODO: set state
    console.log("query called!districtId:", this.state.currentDistrict);
    const url = "http://5e7ce96f71384.freetunnel.cc/api/district/"+
      JSON.stringify(this.state.currentDistrict)+
      "/detail";
    console.log("url:",url);
    axios
      .get(url)
      .then(response => {
        var d=response.data;
        console.log("response:",d);
        this.setState({
          center:{
            lat:(d.latStart+d.latEnd)/2,
            lng:(d.longStart+d.longEnd)/2,
          }
        });
      })
      .catch(error => {
        console.error(error);
        alert("Getting districtDetail Error: " + error);
      })
  }

  render(){
    return(
      <div style={{ height: '70%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: '', language: 'en' }}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
        >
          <RoomIcon
            lat={this.state.center.lat}
            lng={this.state.center.lng}
            color="primary"
            style={{ fontSize: 30 }} />
        </GoogleMapReact>
      </div>
    )
  }
}

class MapLoading extends Component{
  render(){
    return(
      <div style={{ height: '70%', width: '100%', textAlign:'center' }}>
        <p>Map loading...</p>
      </div>
    )
  }
}

export {MapDisplay, MapLoading};
