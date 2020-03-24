import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";

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
        <Typography>{props.description}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          View
        </Button>
        <Button size="small" color="primary">
          Remove
        </Button>
      </CardActions>
    </Card>
  );
}

/*class HouseCard extends Component {
    #name
    #address
    #description

    constructor(name, address, description) {
        super();
        this.#name = name
        this.#address = address
        this.#description = description
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}
export default HouseCard*/
