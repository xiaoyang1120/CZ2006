import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import MobilRightMenuSlider from "@material-ui/core/Drawer";
import PinDropIcon from "@material-ui/icons/PinDrop";
import {AppBar, Toolbar, Button, Typography, Box} from "@material-ui/core";
import AboutUS from "../Boundary/AboutUS";

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

const Navbar = (props) => {
    const [state, setState] = useState({
        isLogin: false,
        right: false
    });

    const toggleSlider = (slider, open) => () => {
        setState({...state, [slider]: open});
    };

    const classes = useStyles();

    const sideList = Slider => (
        <Box
            className={classes.menuSliderContainer}
            component="div"
            onClick={toggleSlider(Slider, false)}
        >
            <AboutUS/>
        </Box>
    );

    return (
        <div>
            <Box component="nav">
                <AppBar position="static">
                    <Toolbar>
                        <PinDropIcon edge="start"/>
                        <Typography variant="h6" className={classes.title}>
                            RealEstatistics
                        </Typography>
                        <Button color="inherit" className={classes.menuButton}
                                href={props.isLoggedIn === "LOGGED_IN" ? "/user/" : "/"}>
                            Home
                        </Button>

                        {props.isLoggedIn === "LOGGED_IN" ? (
                            <Button
                                color="inherit"
                                className={classes.menuButton}
                                href="/user/profile"
                            >
                                Username
                            </Button>
                        ) : (
                            <Button
                                color="inherit"
                                className={classes.menuButton}
                                href="/login"
                            >
                                login
                            </Button>
                        )}

                        <Button
                            onClick={toggleSlider("right", true)}
                            color="inherit"
                            className={classes.menuButton}
                        >
                            About Us
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
        </div>
    );
};

export default Navbar;
