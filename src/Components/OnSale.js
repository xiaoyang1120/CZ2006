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
class OnSale extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      saleHouse: []
    };
    this.Update = this.Update.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(
      "http://5e7ce96f71384.freetunnel.cc/api/user/" + sessionStorage.getItem("uuid") + "/get_posted"
    )
      .then(response => response.json())
      .then(data => this.setState({ isLoading: false, saleHouse: data }));
  }

  Update(id) {
    console.log("Update!" + id);
    this.setState(prevState => {
      const updatedHs = prevState.saleHouse.map(hs => {
        if (hs.houseID === id) {
          hs.status = !hs.status;
        }
        return hs;
      });
      return {
        saleHouse:updatedHs
      };
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {
          <Container className={classes.cardGrid} maxWidth="md">
            <Typography variant="h3">House On Sale</Typography>
            <br />
            {this.state.isLoading ? (
              "Loading..."
            ) : this.state.saleHouse == null ? (
              "No Houses found"
            ) : (
              <Grid container spacing={4}>
                {this.state.saleHouse.map(saleHouse => (
                  <Grid item key={saleHouse.houseId} xs={12} sm={6} md={4}>
                    <HouseCard
                      name={saleHouse.houseId}
                      image={saleHouse.image}
                      districtName={saleHouse.districtId}
                      description={saleHouse.houseDescription}
                      status={saleHouse.isAvailable}
                      buttonName="Update Status"
                      handleClick={this.Update}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Container>
        }
      </div>
    );
  }
}
export default withStyles(styles)(OnSale);
