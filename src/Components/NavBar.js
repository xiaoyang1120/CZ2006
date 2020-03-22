import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MobilRightMenuSlider from "@material-ui/core/Drawer";
import PinDropIcon from "@material-ui/icons/PinDrop";
import { AppBar, Toolbar, Button, Typography, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
//css styles
const useStyles = makeStyles(theme => ({
  menuSliderContainer: {
    width: 400,
    background: "inherit",
    height: "100%"
  },
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const Navbar = () => {
  const [state, setState] = useState({
    right: false
  });

  const toggleSlider = (slider, open) => () => {
    setState({ ...state, [slider]: open });
  };

  const classes = useStyles();

  const sideList = Slider => (
    <Box
      className={classes.menuSliderContainer}
      component="div"
      onClick={toggleSlider(Slider, false)}
    >
      <Typography>About Us</Typography>
    </Box>
  );

  return (
    <>
      <Box component="nav">
        <AppBar position="static">
          <Toolbar>
            <PinDropIcon edge="start" />
            <Typography variant="h6" className={classes.title}>
              RealEstatistics
            </Typography>
            <Button color="inherit" className={classes.menuButton}>
              <Link to="/">Home</Link>
            </Button>
            <Button color="inherit" className={classes.menuButton}>
              <Link to="/profile">Username</Link>
            </Button>
            <Button
              onClick={toggleSlider("right", true)}
              color="inherit"
              className={classes.menuButton}
            >
              About us
            </Button>
            <MobilRightMenuSlider
              anchor="right"
              open={state.right}
              onClose={toggleSlider("right", false)}
            >
              {sideList("right")}
            </MobilRightMenuSlider>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
