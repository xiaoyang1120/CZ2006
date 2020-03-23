import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import HouseCard from "../Boundary/HouseCard";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
/*class Favorite extends Component {
  state = {
    favHouse: [1, 2, 3, 4, 5, 6, 7]
  };
  constructor() {
    super();
    this.getFavHouses();
  }
  getFavHouses = () => {};*/

const favHouse = [1, 2, 3, 4, 5, 6, 7];

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  }
}));

export default function Favorite(props) {
  const classes = useStyles();
  return (
    <div>
      {favHouse ? (
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {favHouse.map(card => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <HouseCard />
              </Grid>
            ))}
          </Grid>
        </Container>
      ) : (
        "No Houses found"
      )}
    </div>
  );
}
