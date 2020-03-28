import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
// import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
// import FormLabel from '@material-ui/core/FormLabel';
//import FormControl from '@material-ui/core/FormControl';
//import FormHelperText from '@material-ui/core/FormHelperText';
//import axios from 'axios';
import Navbar from "../Components/NavBar";
//import testData from "../Data/testData";
import { Redirect } from "react-router-dom";
//css styles unused for now
const styles = theme => ({
  root: {
    display: "flex",
    backgroundColor: "#9fa8da",
    "& > *": { margin: theme.spacing(1) },
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)"
  },

  selected: {
    color: "yellow"
  },
  unselected: {
    color: "white"
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
    e.preventDefault();
    const data = this.state.checked;
    console.log("I'm called!");
    sessionStorage.setItem("chosenCriterion", data);
    // if need to post to api
    // axios.post('https://5e7ce96f71384.freetunnel.cc/api/criteria/get_districts?offset=0', data)
    //       .then(res => console.log(res.data));
    const url =
      "https://5e7ce96f71384.freetunnel.cc/api/criteria/get_districts?offset=0";
    fetch(url, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .catch(error => console.error("Error:", error))
      .then(response => {
        console.log("Success:", response);
        sessionStorage.setItem("filteredDistrictList", response);
      });
  }

  render() {
    const { classes } = this.props;
    // console.log("this.state.boolCri: " + this.state.boolCri)
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
          />
        }
        label={item.name}
        key={item.id}
      />
    ));

    return (
      <div>
        <Navbar />
        <h2 className={classes.unselected}>
          Choose exactly 3 primary criterion:
        </h2>
        <h2 className={classes.unselected}>{text}</h2>
        <form onSubmit={this.handleSubmit}>
          {criItems}
          <br />
          <Button
            type="submit"
            href="criteria_"
            className={classes.unselected}
            disabled={this.state.checked.length != 3}
          >
            Next step
          </Button>
        </form>
      </div>
    );
  }
}
//in button: href="/"
export default withStyles(styles)(PrimaryCriteriaMatching);
//import { green } from "@material-ui/core/colors";

//const GreenCheckbox = withStyles({
// root: {
// color: green[400],
//  "&$checked": { color: green[600] }
// },
// checked: {}
//})(props => <Checkbox color="default" {...props} />);

// <FormControlLabel
//   control={<GreenCheckbox
//             checked={state.checkedB}
//             onChange={handleChange}
//             name="checkedB" />}
//   label="Green1"
// />

// <FormControlLabel
//   control={<Checkbox name="checkedA"
//             icon={<FavoriteBorder />} checkedIcon={<Favorite />}
//             checked={state.checkedA} onChange={handleChange} />}
//   label="Cri1"
// />
