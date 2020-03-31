import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import React, { Component } from "react";
import axios from "axios";
import Tooltip from "@material-ui/core/Tooltip";
import {
  purple,
  orange,
  lightGreen,
  lightBlue,
  red,
  brown,
  green
} from "@material-ui/core/colors";

class MapDisplay extends Component {
  state = {
    disId: null,
    disName: null,
    prevId: null,
    center: null,
    facType:null,
    primary_school: [],
    clinic: []
  };

  static defaultProps = {
    center: {
      lat: 1.36,
      lng: 103.84
    },
    zoom: 12
  };

  static getDerivedStateFromProps(props, state) {
    // Store prevId in state so we can compare when props change.
    // Clear out previously-loaded data (so we don't render stale stuff).
    if (props.id !== state.prevId ||props.type !== state.prevType) {
      if (props.id !== state.prevId){
        return {
          disId: null,
          prevId: props.id,
        };
      }else{
        return {
          facType: null,
          prevType: props.type,
        };
      }
    }
    // No state update necessary
    return null;
  }

  componentDidMount() {
    this._queryDis(this.props.id);
    //no need to query for facility if no facility icon is clicked.
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.disId === null) {
      this._queryDis(this.props.id);

    }
    // if (this.state.facType === null) {
    //   this._queryFac(this.props.id, this.props.type);
    // }
  }

  render() {
    if (this.state.disId === null) {
      // Render loading state ...
      return (
        <div style={{ height: "70%", width: "100%", textAlign: "center" }}>
          <p>Map loading...</p >
        </div>
      );
    } else {
      console.log("this.state.center:", this.state.center)
      const MapWrapped= withScriptjs(withGoogleMap(props=>
        <GoogleMap
          defaultZoom={13}
          defaultCenter={props.center}
          >
        {props.isCenterShown && <Marker position={{ lat: props.center.lat, lng: props.center.lng }} />}
        </GoogleMap>
      ));
      // Render real UI ...

      return (
        <div style={{ height: "70%", width: "100%" }}>
          <MapWrapped
            center={this.state.center}
            isCenterShown
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.40
              &libraries=geometry,drawing,places
              &key=AIzaSyBIG4HJrqb0FCfqfAE7OxQdeDhMTNzhJAU
              `}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      );
    }
  }

  _queryDis(id) {
    //TODO: set state
    // if (!id){
    //   return;
    // }
    //console.log("query called!props.districtId:", id);
    const url =
      "http://5e7ce96f71384.freetunnel.cc/api/district/" + id + "/detail";
    //console.log("url:", url);
    axios
      .get(url)
      .then(response => {
        var d = response.data;
        console.log("single district query response:", d);
        this.setState(prevState => {
          //modified
          var latcenter= (d.latStart+d.latEnd)/2;
          var lngcenter= (d.longStart+d.longEnd)/2;
          console.log("latcenter:",latcenter)
          return {
            disId: id,
            disName: d.districtName,
            center:{
              lat:latcenter,
              lng:lngcenter
            },
          };
        });
      })
      .catch(error => {
        console.error(error);
        alert("Getting districtDetail Error: " + error);
      });
  }
  _queryFac(id, type) {
    const url =
      "http://5e7ce96f71384.freetunnel.cc/api/district/" +
      id +
      "/get_facility_list?type=" +
      type;
    axios
      .get(url)
      .then(response => {
        const d = response.data;
        //console.log(id);
        console.log("query facility response:", d);
        this.setState(prevState => {
          //要改
          return {
            clinic: d
          };
        });
      })
      .catch(error => {
        console.error(error);
        alert("Getting facility Detail Error: " + error);
      });
  }
}

class MapLoading extends Component {
  render() {
    return (
      <div style={{ height: "70%", width: "100%", textAlign: "center" }}>
        <p>Map loading...</p >
      </div>
    );
  }
}

export { MapDisplay, MapLoading };
