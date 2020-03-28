import React, {Component} from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Navbar from "../Components/NavBar";

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

class SecondaryCriteriaMatching extends Component{
  constructor(props){
    super(props)
    this.state={
      boolCri: [],//sessionStorage.getItem(boolCriterion),
      checked: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    //TODO: set state by sessionStorage.getItem
    //TODO: disable those chosen as primary cri
  }

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
    const chosenCri = this.state.checked;
    sessionStorage.setItem("chosenCriterion", chosenCri);
    sessionStorage.setItem("boolCriterion", this.state.boolCri);
    // if need to post to api
    // axios.post('https://5e7ce96f71384.freetunnel.cc/api/criteria/get_districts?offset=0', data)
    //       .then(res => console.log(res.data));
    const url =
      "http://5e7ce96f71384.freetunnel.cc/api/criteria/get_districts";
    console.log(chosenCri);
    let offset = 0;
    sessionStorage.setItem("disListOffset", offset);
    axios
        .post(url, chosenCri, {withCredentials: true,
          params: {offset}})
        .then(response => {
          console.log("Success:", response);
          sessionStorage.setItem("filteredDistrictList", response);
        })
        .catch(error => {
            console.error(error);
            alert("Getting distritList Error: " + error)
        });
    this.props.history.push("/");
    e.preventDefault();
  }

  render(){
    const { classes } = this.props;
    //TODO:set checkbox disabling function disabled={}
    const criItems = this.state.boolCri.map(item => (
      <FormControlLabel
        className={item.isChecked ? classes.selected : classes.unselected}
        control={
          <GreenCheckbox
            name={item.name}
            checked={item.isChecked}
            onChange={this.handleChange}

          />
        }
        label={item.name.charAt(0) + item.name.split('_').join(' ').toLowerCase().slice(1)}
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
    return(
      <div>
        <Navbar />
        <h1>Just blank~</h1>
        // <div className={classes.root}>
        //   <form onSubmit={this.handleSubmit}>
        //     <fieldset>
        //       <legend className={classes.legends}>Choose secondary criterion:</legend>
        //       {criItems}
        //       <br />
        //       <Button
        //         type="submit"
        //         className={classes.unselected}
        //       >
        //         Submit!
        //       </Button>
        //     </fieldset>
        //   </form>
        // </div>
      </div>
    )
  }
}

export default SecondaryCriteriaMatching;
