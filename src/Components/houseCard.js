import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContents from "@material-ui/core/CardContents";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const HouseCard = props => {
  return (
    <div>
      {props.house ? (
        <Card>
          <CardMedia
            style={{ height: 0, paddingTop: "56.25%" }}
            image={props.house.fields.houseImage.fields.file.url}
            title={props.house.fields.title}
          />
          <CardContents>
            <Typography gutterBottom variant="headline" component="h2">
              {props.house.fields.title}
            </Typography>
            <Typography component="p">
              {props.house.fields.description}
            </Typography>
          </CardContents>
          <CardActions>
            <Button
              size="small"
              color="primary"
              href={props.course.fields.url}
              target="_blank"
            >
              Learn More
            </Button>
          </CardActions>
        </Card>
      ) : null}
    </div>
  );
};
export default HouseCard;
