import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
const useStyles = makeStyles(theme => ({
  avatar: {
    display: "block",
    margin: "1rem auto",
    width: theme.spacing(13),
    height: theme.spacing(13)
  },
  listItem: {
    color: "white"
  }
}));

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

const ProfileMenu = () => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={2}>
        <Paper style={{ background: "#211e55" }} component="div">
          <Avatar className={classes.avatar} src={avatar} alt="Liu Yanli" />
          <Divider />
          <List>
            {menuItems.map((lsItem, key) => (
              <ListItem button key={key}>
                <ListItemIcon className={classes.listItem}>
                  {lsItem.listIcon}
                </ListItemIcon>
                <ListItemText
                  className={classes.listItem}
                  primary={lsItem.listText}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
      <Grid item xs={10}>
        <Paper style={{ padding: 20, marginTop: 10, marginBotton: 10 }}>
          <Favorite />
        </Paper>
      </Grid>
    </Grid>
  );
};
export default ProfileMenu;
