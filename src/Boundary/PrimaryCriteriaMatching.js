import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Navbar from "../Components/NavBar";
//import testData from "../Data/testData";

const styles = theme => ({
  root: {
    display: "flex",
    backgroundColor: "#3f51b5",
    "& > *": { margin: theme.spacing(1) },
  },

  selected: {
    color: "yellow",
  },
  unselected: {
    color: "white",
  },
  legends:{
    color:"white",
    fontSize: "30px"
  }
});

class PrimaryCriteriaMatching extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      criterion: [],
      boolCri: [], //format of each item: {id:1, name: "PRI_SCHOOL_XXX", isChecked: false}
      checked: [] //format of the object: {"CRI1", "CRI2", "CRI3"}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.checkSubmission = this.checkSubmission.bind(this)
  }
  componentDidMount() {
    fetch("http://5e7ce96f71384.freetunnel.cc/api/criteria/get_all")
      .then(res => res.json())
      .then(data => {
        console.log("Fetched criterion:", data);
        sessionStorage.setItem("criterion",JSON.stringify(data));
        var list = [];
        var i = 0;
        for (const cri of data) {
          i++;
          list.push({
            id: i,
            name: cri,
            isChecked: false
          });
        }
        this.setState({
          criterion: data,
          loading: false,
          boolCri: list
        });
      });
  }
  // const handleChange = event => {
  //   setState({ ...state, [event.target.name]: event.target.checked });
  // };
  handleChange(event) {
    const { name, checked } = event.target;
    this.setState(prevState => {
      //use .map
      const updatedCri = prevState.boolCri.map(cri => {
        if (cri.name === name) {
          cri.isChecked = checked;
        }
        return cri;
      });
      //update checked[]
      var list = [];
      updatedCri.map(cri => {
        if (cri.isChecked) {
          list.push(cri.name);
        }
        return cri;
      });
      console.log("You checked:", list);
      return {
        boolCri: updatedCri,
        checked: list
      };
    });
  }

  handleSubmit(e) {
    //TODO: store the choices to sessionstorage
    //TODO: jump to secondary criterion page<-done by submit button
    const chosenCri = this.state.checked;
    sessionStorage.setItem("chosenCriterion", JSON.stringify(chosenCri));

    this.props.history.push("/criteria_");
    e.preventDefault();
  }

  render() {
    const { classes } = this.props;
    const text = this.state.loading ? "Loading..." : null;
    const criItems = this.state.boolCri.map(item => (
      <FormControlLabel
        className={item.isChecked ? classes.selected : classes.unselected}
        control={
          <Checkbox
            name={item.name}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            checked={item.isChecked}
            onChange={this.handleChange}
            disabled={(!item.isChecked) && (this.state.checked.length >= 3)}
          />
        }
        label={item.name.charAt(0) + item.name.split('_').join(' ').toLowerCase().slice(1)}
        key={item.id}
      />
    ));

    return (
      <div>
        <Navbar />
        <div className={classes.root}>
          <h2 className={classes.unselected}>{text}</h2>
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              <legend className={classes.legends}>Choose exactly 3 primary criterion:</legend>
              {criItems}
              <br />
              <Button
                type="submit"
                className={classes.unselected}
                disabled={this.state.checked.length !== 3}
              >
                Next step
              </Button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PrimaryCriteriaMatching);
