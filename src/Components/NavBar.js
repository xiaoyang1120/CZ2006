import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import MobilRightMenuSlider from "@material-ui/core/Drawer";
import PinDropIcon from "@material-ui/icons/PinDrop";
import {AppBar, Toolbar, Button, Typography, Box, Avatar} from "@material-ui/core";
import AboutUS from "../Boundary/AboutUS";
import deepPurple from "@material-ui/core/colors/deepPurple";
import Popover from '@material-ui/core/Popover';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ProfilePage from "../Boundary/ProfilePage";
import {withRouter} from "react-router-dom";
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
    },
    avatar: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
        marginRight: theme.spacing(2)
    },
});

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // right: false,
            anchorEl: null,
            isLogin: sessionStorage.getItem("loggedInStatus") === "LOGGED_IN"
        };
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.redirectProfile = this.redirectProfile.bind(this)
        this.redirectChangePwd = this.redirectChangePwd.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    }

    toggleSlider = (slider, open) => () => {
        this.setState({[slider]: open});
    };

    handleOpen(event) {
        this.setState({anchorEl: event.currentTarget})
    }

    handleClose() {
        this.setState({anchorEl: null})
    }

    redirectProfile() {
        if (window.location.pathname === "/profile") {
            window.location.reload()
        }
        this.props.history.push("/profile")
    }

    redirectChangePwd() {
        if (window.location.pathname === "/profile") {
            window.location.reload()
        }
        this.props.history.push({
            pathname: "/profile",
            state: {
                favPage: false,
                changePwd: true,
            }
        })
    }

    handleLogout() {
        if (window.confirm("Do you want to log out?")) {
            sessionStorage.setItem("loggedInStatus", "NOT_LOGGED_IN");
            sessionStorage.setItem("email", null);
            sessionStorage.setItem("uuid", null);
            if (window.location.pathname === "/") {
                window.location.reload()
            } else {
                this.props.history.push("/")
            }
        }
    }

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
        const email = sessionStorage.getItem("email")
        const anchorEl = this.state.anchorEl
        const open = Boolean(anchorEl);

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
                                        aria-controls="customized-menu"
                                        aria-haspopup="true"
                                        color="inherit"
                                        className={classes.menuButton}
                                        onClick={this.handleOpen}
                                    >
                                        {email}
                                    </Button>
                                    <StyledMenu
                                        id="customized-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={open}
                                        onClose={this.handleClose}
                                    >
                                        <MenuItem onClick={this.redirectProfile}>
                                            Profile Menu
                                        </MenuItem>
                                        <MenuItem onClick={this.redirectChangePwd}>
                                            Change Password
                                        </MenuItem>
                                        <MenuItem onClick={this.handleLogout}>
                                            Log Out
                                        </MenuItem>
                                    </StyledMenu>
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

export default withRouter(withStyles(styles)(Navbar));
