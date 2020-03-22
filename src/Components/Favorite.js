/*import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import * as contentful from "contentful";
import HouseCard from "./components/HouseCard";
const SPACE_ID = "";
const ACCESS_TOKEN = "";

const client = contentful.createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN
});
class Favorite extends Component {
  state = {
    favHouse: []
  };
  constructor() {
    super();
    this.getFavHouses();
  }
  getFavHouses = () => {};

  render() {
    return (
      <div>
        {this.state.favHouse ? (
          <div>
            <Grid container spacing={24} style={{ padding: 24 }}>
              {this.state.favHouse.map(currentHouse => (
                <Grid item xs={12} sm={6} lg={4} xl={3}>
                  <HouseCard house={currentHouse} />
                </Grid>
              ))}
            </Grid>
          </div>
        ) : (
          "No Houses found"
        )}
      </div>
    );
  }
}

export default Favorite;*/
