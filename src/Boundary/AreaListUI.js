import React, {Component} from "react";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import NavBar from "../Components/NavBar";
import { ListItem, Grid, Paper, Button, Container } from "@material-ui/core";
import {MapDisplay,MapLoading} from "../Components/MapDisplay";
import SomeIcon from "../Components/SomeIcon";
import axios from "axios";
import { spacing } from '@material-ui/system';

//TODO: (use currentDis) map corresponding district information on the right-side panel (MapDisplay Object)
//TODO: add small maps to each of left list item
//TODO: button need to redirect by method
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
    borderRadius: "10px",
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
    borderRadius: "10px",
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
    borderRadius: "10px",
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) +
      6}px`
  },
  imageMarked: {
    borderRadius: "10px",
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity")
  },
  loadMoreButton: {
    borderRadius: "10px",
    width: "100%",
    textAlign: 'center',
  },
  facilities:{
    marginTop:20,
    position:"relative",
    height: '15%',
    width: '100%',
    justifyContent: 'center',
  },
  icon:{
    marginTop: 10,
    padding:20,
    //textTransform: "none",
  },
  detailbtn:{
    padding: 10,
    textAlign:'center',
    width: "100%",
    height:"10%",
  },

})

class AreaListUI extends Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      districtList:[],
      districtOffset: 0,
      allCriterion:[],
      chosenCriterion:[],
      currentDisIndex:0,
      currentDisId:"",
      //someobject: [],
    };
    //function binding
    this.loadMore = this.loadMore.bind(this);
    this.queryDistrictList = this.queryDistrictList.bind(this);
    this.changeDis = this.changeDis.bind(this);
  }

  componentDidMount() {
    //TODO: set state by sessionStorage.getItem
    const criterion= JSON.parse(sessionStorage.getItem("criterion"));
    const chosenCri= JSON.parse(sessionStorage.getItem("finalCriterion"));
    sessionStorage.setItem("disListOffset", JSON.stringify(this.state.districtOffset));
    this.queryDistrictList(this.state.districtOffset);
    var data = JSON.parse(sessionStorage.getItem("filteredDistrictList"));
    console.log("data:", data)
    this.setState({
      districtList: data,
      allCriterion: criterion,
      chosenCriterion: chosenCri,
      currentDisId: data[0].districtId,
    });
  }

  queryDistrictList(offset){
    console.log("query called!offset=", offset);
    const url = "http://5e7ce96f71384.freetunnel.cc/api/criteria/get_districts";
    sessionStorage.setItem("disListOffset", JSON.stringify(offset));
    //console.log("this.state.chosenCriterion:",this.state.chosenCriterion);
    var sending;
    if (offset!==0){
      sending=this.state.chosenCriterion;
    }else {
      sending=JSON.parse(sessionStorage.getItem("finalCriterion"));
    }
    console.log("sending...",sending);
    axios
      .post(url, sending, { withCredentials: true, params: { offset } })
      .then(response => {
        var data;
        if (offset!==0){
          data=this.state.districtList.concat(response.data);
        }else {
          data=response.data;
        }
        sessionStorage.setItem( "filteredDistrictList", JSON.stringify(data));
        this.setState(prevState=>{
          return {districtList: data, districtOffset: offset}
        })
      })
      .catch(error => {
        console.error(error);
        alert("Getting distritList Error: " + error);
      });
  }

  loadMore(){
    var offset = this.state.districtOffset + 10;
    this.queryDistrictList(offset);

  }

  changeDis(disId){
    this.setState(prevState=>{
      console.log("you clicked district:", disId);
      sessionStorage.setItem("currentDistrict", JSON.stringify(disId));
      var index= prevState.districtList.findIndex(cri=>cri.districtId===disId)
      return {currentDisIndex: index, currentDisId: disId}
    })
  }

  render(){
    const { classes } = this.props;
    console.log("in render, districtList:",this.state.districtList);
    const areaItems=(!this.state.districtList)?null:
      (this.state.districtList).map(district=>(
        <ListItem key={district.districtId}>
          <ButtonBase
            focusRipple
            key={district.districtId}
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            onClick={()=>this.changeDis(district.districtId)}
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
      ));
    const mapDisplay=(!this.state.currentDisId)?<MapLoading />:
      <MapDisplay disId={this.state.currentDisId}/>
    //const facilityBadges=null;
    const facilityBadges=(!this.state.districtList)?null:
      (this.state.allCriterion).map(cri=>(
          <SomeIcon
            key={cri}
            cri={cri}
            disInfo={this.state.districtList[this.state.currentDisIndex]}/>
      ))

    console.log(this.state.currentDis);
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
                {areaItems}
                <Container className={classes.loadMoreButton}>
                  <div>
                    <Button
                      size="large"
                      color="primary"
                      onClick={this.loadMore}
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
              {mapDisplay}

              <Container className={classes.facbtns}>
                <div className={classes.facilities}>
                  {facilityBadges}
                </div>
              </Container>
              <Container className={classes.detailbtn}>
                <div>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    href="/house@area"
                  >
                    See houses in this area
                  </Button>
                </div>
              </Container>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(AreaListUI);
