import React from "react";
import { Typography, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typed from "react-typed";
import Particles from "react-particles-js";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import SearchIcon from "@material-ui/icons/Search";
import Navbar from "../Components/NavBar";

const useStyles = makeStyles(theme => ({
  title: {
    color: "white"
  },
  subtitle: {
    color: "white"
  },
  typedContainer: {
    position: "static",
    width: "100vw",
    textAlign: "center"
  },
  particlesCanva: {
    position: "absolute"
  }
}));

const HomePage = () => {
  const classes = useStyles();
  return (
    <div>
      <Navbar />
      <Particles
        canvasClassName={classes.particlesCanva}
        params={{
          particles: {
            number: {
              value: 60,
              density: {
                enable: true
              }
            },
            shape: {
              type: "circle",
              strole: {
                width: 5,
                color: "white"
              }
            },
            size: {
              value: 5,
              random: true,
              anim: {
                enable: true,
                speed: 3,
                size_min: 0.1,
                sync: true
              }
            }
          }
        }}
      />
      <Box className={classes.typedContainer}>
        <br />
        <br />
        <br />
        <Typography className={classes.title} variant="h2">
          <Typed
            strings={["Search for Your Ideal Home with Us."]}
            typeSpeed={60}
          />
        </Typography>
        <br />
        <Typography className={classes.subtitle}>
          We provide the most real and latest statistics from the SG government
          official website to find your idea house.
        </Typography>
        <br />
        <br />
        <br />
        <br />
        <Button
          variant="contained"
          size="large"
          color="primary"
          className={classes.margin}
          startIcon={<SearchIcon />}
          href="/criteria"
        >
          Choose Your Criteria
        </Button>
        <br />
        <br />
        <br />
        <br />
        <Typography className={classes.title} variant="h2">
          <Typed strings={["Have a House for Sale?"]} typeSpeed={60} />
        </Typography>
        <br />
        <Typography className={classes.subtitle}>
          Post information of your house for sale here. It is more likely you
          will find a satisfactory client!
        </Typography>
        <br />
        <br />
        <br />
        <br />
        <Button
          variant="contained"
          size="large"
          color="primary"
          href="/upload"
          className={classes.margin}
          startIcon={<CloudUploadIcon />
          }
        >
          post new house info
        </Button>
      </Box>
    </div>
  );
};

export default HomePage;
