import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  ListItem,
  ListItemText,
  Avatar,
  Divider,
  List,
  ListItemIcon
} from "@material-ui/core";

import LoyaltyIcon from "@material-ui/icons/Loyalty";
import HouseIcon from "@material-ui/icons/House";
import avatar from "../avatar.png";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Favorite from "../Components/Favorite";

//css styles
const styles = theme => ({
  avatar: {
    display: "block",
    margin: "1rem auto",
    width: theme.spacing(13),
    height: theme.spacing(13)
  },
  listItem: {
    color: "white"
  }
});

const menuItems = [
  {
    listIcon: <LoyaltyIcon />,
    listText: "Favorite"
  },
  {
    listIcon: <HouseIcon />,
    listText: "House on Sale"
  },
  {
    listIcon: <ExitToAppIcon />,
    listText: "Log Out"
  }
];

class ProfileMenu extends Component {
  constructor() {
    super();
    this.state = {
      isLogin: true,
      favPage: true
    };
    this.handleFavHouse = this.handleFavHouse.bind(this);
    this.handleSaleHouse = this.handleSaleHouse.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleFavHouse() {
    this.setState({ favPage: true });
  }
  handleSaleHouse() {
    this.setState({ favPage: false });
  }
  handleLogout() {
    //this.setState({ isLogin: false });
    console.log("log out");
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid item xs={2}>
          <Paper style={{ background: "#211e55" }} component="div">
            <Avatar className={classes.avatar} src={avatar} alt="Liu Yanli" />
            <Divider />
            <List>
              <ListItem button onClick={this.handleFavHouse}>
                <ListItemIcon className={classes.listItem}>
                  <LoyaltyIcon />
                </ListItemIcon>
                <ListItemText className={classes.listItem} primary="Favorite" />
              </ListItem>
              <ListItem button onClick={this.handleSaleHouse}>
                <ListItemIcon className={classes.listItem}>
                  <HouseIcon />
                </ListItemIcon>
                <ListItemText
                  className={classes.listItem}
                  primary="House on Sale"
                />
              </ListItem>
              <ListItem button onClick={this.handleLogout}>
                <ListItemIcon className={classes.listItem}>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText className={classes.listItem} primary="Log Out" />
              </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper style={{ padding: 20, marginTop: 10, marginBotton: 10 }}>
            {this.state.favPage ? <Favorite /> : "It is empty now!"}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
export default withStyles(styles)(ProfileMenu);