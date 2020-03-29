import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Navbar from "../Components/NavBar";
import { green } from "@material-ui/core/colors";
import axios from "axios";

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": { color: green[600] }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);

const styles = theme => ({
  root: {
    display: "flex",
    backgroundColor: "#3f51b5",
    "& > *": { margin: theme.spacing(1) }
  },

  selected: {
    color: "yellow"
  },
  unselected: {
    color: "white"
  },
  legends: {
    color: "white",
    fontSize: "30px"
  }
});

class SecondaryCriteriaMatching extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      criterion: [], //sessionStorage.getItem("criterion"),
      secBoolCri: [], //added "isAvai" value
      secChecked: [],
      priChecked: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    //TODO: set state by sessionStorage.getItem
    //TODO: disable those chosen as primary cri
    //console.log("Fetched criterion:", data);
    var data = JSON.parse(sessionStorage.getItem("criterion"));
    console.log("componentDidMount.criterion", data);
    if (!data) {
      alert("Please choose primary criterion first.");
      this.props.history.push("/criteria");
    }
    var priCri = JSON.parse(sessionStorage.getItem("chosenCriterion"));
    var list = [];
    var i = 0;
    for (const cri of data) {
      i++;
      if (priCri.includes(cri)) {
        list.push({
          id: i,
          name: cri,
          isChecked: true,
          isAvai: false
        });
      } else {
        list.push({
          id: i,
          name: cri,
          isChecked: false,
          isAvai: true
        });
      }
    }
    console.log("componentDidMount.list[0]", list[0]);
    this.setState({
      criterion: data,
      loading: false,
      secBoolCri: list,
      priChecked: priCri
    });
  }

  handleChange(event) {
    const { name, checked } = event.target;
    this.setState(prevState => {
      //use .map
      const updatedCri = prevState.secBoolCri.map(cri => {
        if (cri.name === name) {
          cri.isChecked = checked;
        }
        return cri;
      });
      //update checked[]
      var list = [];
      updatedCri.map(cri => {
        if (cri.isChecked && cri.isAvai) {
          list.push(cri.name);
        }
        return cri;
      });
      console.log("You checked:", list);
      return {
        secBoolCri: updatedCri,
        secChecked: list
      };
    });
  }

  handleSubmit(e) {
    //TODO: store the choices to sessionstorage
    //TODO: jump to secondary criterion page<-done by submit button
    const chosenCri = this.state.priChecked.concat(this.state.secChecked);
    sessionStorage.setItem("finalCriterion", JSON.stringify(chosenCri));
    // if need to post to api
    // axios.post('https://5e7ce96f71384.freetunnel.cc/api/criteria/get_districts?offset=0', data)
    //       .then(res => console.log(res.data));
    const url = "http://5e7ce96f71384.freetunnel.cc/api/criteria/get_districts";
    console.log(chosenCri);
    let offset = 0;
    sessionStorage.setItem("disListOffset", JSON.stringify(offset));
    axios
      .post(url, chosenCri, { withCredentials: true, params: { offset } })
      .then(response => {
        console.log("Success:", response);
        sessionStorage.setItem(
          "filteredDistrictList",
          JSON.stringify(response)
        );
      })
      .catch(error => {
        console.error(error);
        alert("Getting distritList Error: " + error);
      });
    this.props.history.push("/arealist");
    e.preventDefault();
  }

  render() {
    const { classes } = this.props;
    const text = this.state.loading ? "Loading..." : null;
    //TODO:set checkbox disabling function disabled={}
    const criItems = this.state.secBoolCri.map(item => (
      <FormControlLabel
        className={item.isChecked ? classes.selected : classes.unselected}
        control={
          <GreenCheckbox
            name={item.name}
            checked={item.isChecked}
            onChange={this.handleChange}
            disabled={!item.isAvai}
          />
        }
        label={
          item.name.charAt(0) +
          item.name
            .split("_")
            .join(" ")
            .toLowerCase()
            .slice(1)
        }
        key={item.id}
      />
    ));
    // <FormControlLabel
    //   control={<GreenCheckbox
    //             checked={state.checkedB}
    //             onChange={handleChange}
    //             name="checkedB" />}
    //   label="Green1"
    // />
    return (
      <div>
        <Navbar />
        <div className={classes.root}>
          <h2 className={classes.unselected}>{text}</h2>
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              <legend className={classes.legends}>
                Choose secondary criterion:
              </legend>
              {criItems}
              <br />
              <Button
                type="submit"
                className={classes.unselected}
              >
                Submit!
              </Button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SecondaryCriteriaMatching);
