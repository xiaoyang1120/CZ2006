import React, { Component } from "react";
//import { withStyles } from "@material-ui/core/styles";
import GoogleMapReact from "google-map-react";
import { fitBounds } from "google-map-react/utils";
import RoomIcon from "@material-ui/icons/Room";
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
    bounds: null
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
    if (props.id !== state.prevId) {
      return {
        disId: null,
        prevId: props.id
      };
    }
    // No state update necessary
    return null;
  }

  componentDidMount() {
    this._queryDis(this.props.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.disId === null) {
      this._queryDis(this.props.id);
    }
  }

  render() {
    if (this.state.disId === null) {
      // Render loading state ...
      return (
        <div style={{ height: "70%", width: "100%", textAlign: "center" }}>
          <p>Map loading...</p>
        </div>
      );
    } else {
      // Render real UI ...
      const center1 = (this.state.bounds.nw.lat + this.state.bounds.se.lat) / 2;
      const center2 = (this.state.bounds.nw.lng + this.state.bounds.se.lng) / 2;

      return (
        <div style={{ height: "70%", width: "100%" }}>
          <img
            src={
              "https://maps.googleapis.com/maps/api/staticmap?center=" +
              center1 +
              "," +
              center2 +
              "&zoom=14&size=800x350&key=AIzaSyCV_hO2yd_zTG_JkbXy21CO16311-OOMdU"
            }
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
    console.log("query called!props.districtId:", id);
    const url =
      "http://5e7ce96f71384.freetunnel.cc/api/district/" + id + "/detail";
    console.log("url:", url);
    axios
      .get(url)
      .then(response => {
        var d = response.data;
        console.log("response:", d);
        this.setState(prevState => {
          //要改
          return {
            disId: id,
            disName: d.districtName,
            bounds: {
              nw: {
                lat: d.latStart,
                lng: d.longStart
              },
              se: {
                lat: d.latEnd,
                lng: d.longEnd
              }
            }
          };
        });
      })
      .catch(error => {
        console.error(error);
        alert("Getting districtDetail Error: " + error);
      });
  }
}

class MapLoading extends Component {
  render() {
    return (
      <div style={{ height: "70%", width: "100%", textAlign: "center" }}>
        <p>Map loading...</p>
      </div>
    );
  }
}

export { MapDisplay, MapLoading };
