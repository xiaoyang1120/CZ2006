import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import HouseCard from "../Boundary/HouseCard";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Typography } from "@material-ui/core";

const styles = theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  }
});
class Favorite extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      favHouse: [
        {
          houseID: "Hall 11",
          image: "https://source.unsplash.com/random",
          houseDescription: "This is a good house",
          districtID: "Jurong East",
          status: true
        },
        {
          houseID: "Hall 2",
          image: "https://source.unsplash.com/random",
          houseDescription: "This is a normal hosue",
          districtID: "Bedok",
          status: true
        },
        {
          houseID: "Tamarind Hall",
          image: "https://source.unsplash.com/random",
          houseDescription: "This is a normal hosue",
          districtID: "NTU",
          status: true
        },
        {
          houseID: "Hall 3",
          image: "https://source.unsplash.com/random",
          houseDescription: "This is a amazing hosue",
          districtID: "NTU",
          status: false
        }
      ]
    };
    this.Remove = this.Remove.bind(this);
  }

  componentDidMount() {
    /*this.setState({ isLoading: true });
    fetch(
      "http://localhost:8080/api/user/015819ef-f799-4431-84ea-960413b583c4/get_fav"
    )
      .then(response => response.json())
      .then(data => this.setState({ isLoading: false, favHouse: data }));*/
  }
  Remove(id) {
    console.log("Remove!" + id);
    let newFavhouse = [];
    for (let i = 0; i < this.state.favHouse.length; i++) {
      if (this.state.favHouse[i].houseID != id) {
        newFavhouse.push(this.state.favHouse[i]);
      }
    }
    this.setState({ favHouse: newFavhouse });
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.favHouse ? (
          <Container className={classes.cardGrid} maxWidth="md">
            <Typography variant="h3">FavoriteHouse</Typography>
            <br />
            {this.state.isLoading ? (
              "Loading..."
            ) : (
              <Grid container spacing={4}>
                {this.state.favHouse.map(favHouse => (
                  <Grid item key={favHouse.houseID} xs={12} sm={6} md={4}>
                    <HouseCard
                      name={favHouse.houseID}
                      image={favHouse.image}
                      districtName={favHouse.districtID}
                      description={favHouse.houseDescription}
                      status={favHouse.status}
                      buttonName="Remove from Fav."
                      handleClick={this.Remove}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Container>
        ) : (
          "No Houses found"
        )}
      </div>
    );
  }
}
export default withStyles(styles)(Favorite);
