import React, {Component} from "react";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import NavBar from "../Components/NavBar";
import { ListItem, Grid, Paper, Button, Container } from "@material-ui/core";
import MapDisplay from "../Components/MapDisplay";

const images = [
  {
    url: "https://source.unsplash.com/random",
    title: "District 1",
    width: "100%"
  },
  {
    url: "https://source.unsplash.com/random",
    title: "District 2",
    width: "100%"
  },
  {
    url: "https://source.unsplash.com/random",
    title: "District 3",
    width: "100%"
  },
  {
    url: "https://source.unsplash.com/random",
    title: "District 4",
    width: "100%"
  },
  {
    url: "https://source.unsplash.com/random",
    title: "District 5",
    width: "100%"
  },
  {
    url: "https://source.unsplash.com/random",
    title: "District 6",
    width: "100%"
  }
];

const styles = theme => ({
  root: {
    width: "100%",
    height:"100%",
    spacing: 0,
    justify: "space-around",
    overflow: "hidden"
  },
  leftList:{
    height: 450,
    overflow: "auto"
  },
  session:{
    padding: 20,
    marginTop: 10,
    marginBotton: 10,
    height:450,
    overflow: "hidden"
  },
  image: {
    position: "relative",
    height: 200,
    borderRadius: "50px",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: 100
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15
      },
      "& $imageMarked": {
        opacity: 0
      },
      "& $imageTitle": {
        border: "4px solid currentColor"
      }
    }
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%"
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity")
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) +
      6}px`
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity")
  },
  loadMoreButton: {
    width: "100%",
  }
})

class AreaListUI extends Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      districtList:[],
      //someobject: [],
    };
    //function binding
  }

  componentDidMount() {
    //TODO: set state by sessionStorage.getItem
    var data = JSON.parse(sessionStorage.getItem("filteredDistrictList"));
    console.log("data:", data)
    this.setState({
      districtList: data
    });
  }

  loadMore(){

  }

  render(){
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <NavBar />
        <Grid container spacing={1}>
          <Grid item xs={4}>
              <Typography variant="h4" align="center" style={{ color: "white", height: "50px", paddingTop: "10px"}}>
                Recommended districts
              </Typography>
              <div style={{overflow:'hidden'}}>
              <Paper className={classes.leftList}>
                {(this.state.districtList).map(district=>(
                  <ListItem key={district.districtId}>
                    <ButtonBase
                      focusRipple
                      key={district.districtId}
                      className={classes.image}
                      focusVisibleClassName={classes.focusVisible}
                    >
                      <span
                        className={classes.imageSrc}
                        style={{
                          backgroundImage: "https://source.unsplash.com/random"
                        }}
                      />
                      <span className={classes.imageBackdrop} />
                      <span className={classes.imageButton}>
                        <Typography
                          component="span"
                          variant="subtitle1"
                          color="inherit"
                          className={classes.imageTitle}
                        >
                          {district.name}
                          <span className={classes.imageMarked} />
                        </Typography>
                      </span>
                    </ButtonBase>
                  </ListItem>
                ))}
                <Container className={classes.loadMoreButton} style={{textAlign: 'center'}}>
                  <div>
                    <Button
                      size="large"
                      color="primary"
                      onClick={this.loadMore}
                      style={{justifyContent: 'center'}}
                      >
                      Load More...
                    </Button>
                  </div>
                </Container>

              </Paper>
            </div>
          </Grid>
          <Grid item xs={8}>
            <Paper className={classes.session}>

              <MapDisplay />
              <br />
              <div>
                <Button
                  variant="outlined"
                  size="large"
                  color="primary"
                  className={classes.margin}
                >
                  A
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  color="primary"
                  className={classes.margin}
                >
                  B
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  color="primary"
                  className={classes.margin}
                >
                  C
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  color="primary"
                  className={classes.margin}
                >
                  D
                </Button>
              </div>
              <Button
                variant="contained"
                size="large"
                color="primary"
                className={classes.margin}
                href="/house@area"
              >
                See houses in this area
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(AreaListUI);
