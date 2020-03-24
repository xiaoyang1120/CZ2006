import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import HouseCard from "../Boundary/HouseCard";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Typography } from "@material-ui/core";
const favHouse = [
  {
    houseID: "Hall 11",
    image: "https://source.unsplash.com/random",
    houseDescription: "This is a good house",
    districtID: "Jurong East"
  },
  {
    houseID: "Hall 2",
    image: "https://source.unsplash.com/random",
    houseDescription: "This is a normal hosue",
    districtID: "Bedok"
  },
  {
    houseID: "Tamarind Hall",
    image: "https://source.unsplash.com/random",
    houseDescription: "This is a normal hosue",
    districtID: "NTU"
  },
  {
    houseID: "Hall 3",
    image: "https://source.unsplash.com/random",
    houseDescription: "This is a amazing hosue",
    districtID: "NTU"
  }
];

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
          <Typography variant="h3">FavoriteHouse</Typography>
          <br />
          <Grid container spacing={4}>
            {favHouse.map(favHouse => (
              <Grid item key={favHouse.houseID} xs={12} sm={6} md={4}>
                <HouseCard
                  name={favHouse.houseID}
                  image={favHouse.image}
                  districtName={favHouse.districtID}
                  description={favHouse.houseDescription}
                />
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

/*class Favorite extends Component {
  state = {
    favHouse: [1, 2, 3, 4, 5, 6, 7]
  };
  constructor() {
    super();
    this.getFavHouses();
  }
  getFavHouses = () => {};*/
