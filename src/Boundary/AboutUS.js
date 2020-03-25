import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}));
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const AboutUS = () => {
  const classes = useStyles();
  return (
    <div>
      <Container>
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          About Us
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          Our project aims to design a web-based discussion platform with
          information of house rentings and sales, and district recommendation
          based on users’ requirements.
        </Typography>
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            RealEstatistics
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            There is always a home for you.
          </Typography>
          <Copyright />
        </footer>
      </Container>
    </div>
  );
};

export default AboutUS;
