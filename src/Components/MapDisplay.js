import React, { Component } from "react";
//import { withStyles } from "@material-ui/core/styles";
import GoogleMapReact from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';
import RoomIcon from '@material-ui/icons/Room';
import axios from "axios";

//const AnyReactComponent = ({ text }) => <div>{text}</div>;

class MapDisplay extends Component{
  constructor(props) {
    super(props);
    this.state = {
      currentDistrict:this.props.disId,
      bounds:{},
      renderAvai: false,
      //someobject: [],
    };
    //function binding
  //  this.queryFacility=this.queryFacility.bind(this);
  }

  static defaultProps = {
     center: {
       lat: 1.36,
       lng: 103.84,
     },
     zoom: 12,
   };

  componentDidMount() {
    //TODO: set state
    console.log("query called!districtId:", this.state.currentDistrict);

    const url = "http://5e7ce96f71384.freetunnel.cc/api/district/"+
      this.state.currentDistrict+
      "/detail";
    console.log("url:",url);
    axios
      .get(url)
      .then(response => {
        var d=response.data;
        console.log("response:",d);
        this.setState({
          bounds:{
            nw: {
              lat: d.latStart,
              lng: d.longStart,
            },
            se: {
              lat: d.latEnd,
              lng: d.longEnd,
            }
          },
          renderAvai: true,
        });
      })
      .catch(error => {
        console.error(error);
        alert("Getting districtDetail Error: " + error);
      })
  }
  // zoomToDistrict(){
  //   const size = {
  //     width: 350, // Map width in pixels
  //     height: 350, // Map height in pixels
  //   };
  //   const {center, zoom} = fitBounds(this.state.bounds, size);
  // }
  render(){
    if (!this.state.renderAvai){
      return(
        <div style={{ height: '70%', width: '100%', textAlign:'center' }}>
          <p>Map loading...</p>
        </div>
      )
    }else{
      const size = {
        width: 350, // Map width in pixels
        height: 350, // Map height in pixels
      };
      const {center, zoom} = fitBounds(this.state.bounds, size);
      return(
        <div style={{ height: '70%', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: '', language: 'en' }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <RoomIcon
              lat={center.lat}
              lng={center.lng}
              color="primary"
              style={{ fontSize: 30 }} />
          </GoogleMapReact>
        </div>
      )
    }
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
