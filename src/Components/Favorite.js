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
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      favHouse: []
    };
    this.Remove = this.Remove.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(
      "http://5e7ce96f71384.freetunnel.cc/api/user/" + sessionStorage.getItem("uuid") + "/get_fav",
    )
      .then(response => response.json())
      .then(data => this.setState({ isLoading: false, favHouse: data }));
  }
  Remove(id) {
    alert("remove")
    // console.log("Remove!" + id);
    // let newFavhouse = [];
    // for (let i = 0; i < this.state.favHouse.length; i++) {
    //   if (this.state.favHouse[i].houseID !== id) {
    //     newFavhouse.push(this.state.favHouse[i]);
    //   }
    // }
    // this.setState({ favHouse: newFavhouse });
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
                  <Grid item key={favHouse.houseId} xs={12} sm={6} md={4}>
                    <HouseCard
                      houseData={favHouse}
                      type="fav"
                      buttonName="Remove"
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
