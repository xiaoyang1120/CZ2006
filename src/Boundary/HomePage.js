import React, { Component } from "react";
import { Typography, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typed from "react-typed";
import Particles from "react-particles-js";
const useStyles = makeStyles(theme => ({
  title: {
    color: "white"
  },
  subtitle: {
    color: "white"
  },
  typedContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100vw",
    textAlign: "center"
  },
  particlesCanva: {
    //position: "absolute"
  }
}));
/*class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedin: true
    };
  }*/

// callLoginUI(){}
// chooseCriteria(){}
// aboutUs(){}
// nextPage(){}
// back(){}
//render() {
const HomePage = () => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.typedContainer}>
        <Typography className={classes.title} variant="h2">
          <Typed strings={["Search For Your Idea Home with Us."]} typeSpeed={60} />
        </Typography>
        <br />
        <Typography className={classes.subtitle}>
          We provide the most real and latest statistics from the SG government
          official website to find your idea house.
        </Typography>
      </Box>
      <Particles
        canvasClassName={classes.particlesCanvas}
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
    </>
  );
};

export default HomePage;
