import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import MobilRightMenuSlider from "@material-ui/core/Drawer";
import PinDropIcon from "@material-ui/icons/PinDrop";
import {AppBar, Toolbar, Button, Typography, Box} from "@material-ui/core";
import AboutUS from "../Boundary/AboutUS";
//css styles
const styles = theme => ({
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
});

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            right: false,
            isLogin: sessionStorage.getItem("loggedInStatus") === "LOGGED_IN"
        };
    }

    toggleSlider = (slider, open) => () => {
        this.setState({[slider]: open});
    };

    render() {
        const sideList = Slider => (
            <Box
                className={classes.menuSliderContainer}
                component="div"
                onClick={this.toggleSlider(Slider, false)}
            >
                <AboutUS/>
            </Box>
        );
        const {classes} = this.props;
        return (
            <div>
                <Box component="nav">
                    <AppBar position="static">
                        <Toolbar>
                            <PinDropIcon edge="start"/>
                            <Typography variant="h6" className={classes.title}>
                                RealEstatistics
                            </Typography>
                            <Button color="inherit" className={classes.menuButton} href="/">
                                Home
                            </Button>

                            {this.state.isLogin ? (
                                <div>
                                    <Button
                                        color="inherit"
                                        className={classes.menuButton}
                                        href="/profile"
                                    >
                                      {sessionStorage.getItem("email")}
                                    </Button>
                                </div>
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
                                onClick={this.toggleSlider("right", true)}
                                color="inherit"
                                className={classes.menuButton}
                            >
                                About Us
                            </Button>
                            <MobilRightMenuSlider
                                anchor="right"
                                open={this.state.right}
                                onClose={this.toggleSlider("right", false)}
                            >
                                {sideList("right")}
                            </MobilRightMenuSlider>
                        </Toolbar>
                    </AppBar>
                </Box>
            </div>
        );
    }
}

export default withStyles(styles)(Navbar);
