import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import React, { Component, useState } from "react";
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
function Map(props) {
  const [selected, setSelected] = useState(null);
  return (
    <GoogleMap defaultZoom={13} defaultCenter={props.center}>
      {props.isCenterShown && (
        <Marker
          position={{ lat: props.center.lat, lng: props.center.lng }}
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          }}
        />
      )}
      {props.fac.map(c => (
        <Marker
          key={c.clinicID}
          position={{
            lat: c.lat,
            lng: c.long_
          }}
          onClick={() => {
            setSelected(c);
          }}
        />
      ))}
      {selected && (
        <InfoWindow
          onCloseClick={() => {
            setSelected(null);
          }}
          position={{
            lat: selected.lat,
            lng: selected.long_
          }}
        >
          <div>
            <h4>{selected.clinicName}</h4>
            <p> Description: {selected.description}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
class MapDisplay extends Component {
  state = {
    disId: null,
    disName: null,
    prevId: null,
    center: null,
    fac: [],
    facType: null
  };

  static getDerivedStateFromProps(props, state) {
    // Store prevId in state so we can compare when props change.
    // Clear out previously-loaded data (so we don't render stale stuff).
    if (props.id !== state.prevId || props.type !== state.prevType) {
      if (props.id !== state.prevId) {
        return {
          disId: null,
          prevId: props.id
        };
      } else {
        return {
          facType: null,
          prevType: props.type
        };
      }
    }
    // No state update necessary
    return null;
  }

  componentDidMount() {
    this._queryDis(this.props.id);
    //this._queryFac(this.props.id, this.props.type);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.disId === null) {
      this._queryDis(this.props.id);
      if (this.state.facType === null) {
        this._queryFac(this.props.id, this.props.type);
      }
    }
  }

  render() {
    if (this.state.disId === null) {
      return (
        <div style={{ height: "70%", width: "100%", textAlign: "center" }}>
          <p>Map loading...</p>
        </div>
      );
    } else {
      const MapWrapped = withScriptjs(withGoogleMap(props => Map(props)));

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
            fac={this.state.fac}
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
          var latcenter = (d.latStart + d.latEnd) / 2;
          var lngcenter = (d.longStart + d.longEnd) / 2;
          console.log("latcenter:", latcenter);
          return {
            disId: id,
            disName: d.districtName,
            center: {
              lat: latcenter,
              lng: lngcenter
            }
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
        console.log("response:", d);
        this.setState(prevState => {
          //要改
          return {
            fac: d
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
