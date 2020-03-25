import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles(theme => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  }
}));

export default function HouseCard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={props.image} /*"https://source.unsplash.com/random"*/
        title="Image title"
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {props.name}
        </Typography>
        <Typography gutterBottom variant="h6" component="h2">
          Location: {props.districtName}
        </Typography>
        <Typography gutterBottom variant="h6" component="h2">
          Status: {props.status ? "Available" : "Not Available"}
        </Typography>
        <Typography>{props.description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={handleClickOpen /*event => props.handleClick(props.name)*/}
        >
          {props.buttonName}
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"ATTENSION!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure to make the change?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={event => {
                handleClose();
                props.handleClick(props.name);
              }}
              color="primary"
            >
              Confirm
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              Cancle
            </Button>
          </DialogActions>
        </Dialog>
      </CardActions>
    </Card>
  );
}
