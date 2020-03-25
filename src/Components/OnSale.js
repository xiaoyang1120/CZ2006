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
      saleHouse: [
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
          status: false
        }
      ]
    };
    this.Update = this.Update.bind(this);
  }

  componentDidMount() {
    /*this.setState({ isLoading: true });
    fetch(
      "http://localhost:8080/api/user/015819ef-f799-4431-84ea-960413b583c4/get_posted"
    )
      .then(response => response.json())
      .then(data => this.setState({ isLoading: false, saleHouse: data }));*/
  }

  Update(id) {
    console.log("Update!" + id);
    this.setState(preState => {
      for (let i = 0; i < this.state.saleHouse.length; i++) {
        if (this.state.saleHouse[i].houseID == id) {
          this.state.saleHouse[i].status = !this.state.saleHouse[i].status;
        }
      }
      return this.state.saleHouse;
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
                  <Grid item key={saleHouse.houseID} xs={12} sm={6} md={4}>
                    <HouseCard
                      name={saleHouse.houseID}
                      image={saleHouse.image}
                      districtName={saleHouse.districtID}
                      description={saleHouse.houseDescription}
                      status={saleHouse.status}
                      buttonName="Update Status."
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
