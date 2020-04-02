import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, ListItem, Grid } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Navbar from "../Components/NavBar";
import { green } from "@material-ui/core/colors";
import { titleCase } from "./PrimaryCriteriaMatching";

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": { color: green[600] }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);

const styles = theme => ({
  root: {
    display: "flex"
    //backgroundColor: "#3f51b5",
    //"& > *": { margin: theme.spacing(1) }
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
    if (this.props.history.location.state === undefined) {
      alert("Please choose the criteria before accessing this page!");
      this.props.history.push("/criteria");
      return;
    }
    //TODO: set state by sessionStorage.getItem
    //TODO: disable those chosen as primary cri
    var data = JSON.parse(sessionStorage.getItem("criterion"));
    console.log("componentDidMount.criterion", data);
    // if (!data) {
    //   alert("Please choose primary criterion first.");
    //   this.props.history.push("/criteria");
    // }
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
    //TODO: jump to secondary criterion page<-done by submit button
    const chosenCri = this.state.priChecked.concat(this.state.secChecked);
    sessionStorage.setItem("finalCriterion", JSON.stringify(chosenCri));

    this.props.history.push({
      pathname: "/arealist",
      state: {
        prev: true
      }
    });
    e.preventDefault();
  }

  render() {
    const { classes } = this.props;
    const text = this.state.loading ? "Loading..." : null;
    //TODO:set checkbox disabling function disabled={}
    const criItems = this.state.secBoolCri.map(item => (
      <ListItem>
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
          label={titleCase(item.name)}
          key={item.id}
        />
      </ListItem>
    ));

    return (
      <div>
        <Navbar />
        <div className={classes.root}>
          <h2 className={classes.unselected}>{text}</h2>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "100vh" }}
          >
            <Grid item xs={10}>
              <form onSubmit={this.handleSubmit}>
                <fieldset>
                  <legend className={classes.legends}>
                    Choose 「Secondary」 Criteria
                  </legend>
                  <list>{criItems}</list>
                  <br />
                  <Button type="submit" className={classes.unselected}>
                    Submit!
                  </Button>
                </fieldset>
              </form>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SecondaryCriteriaMatching);
