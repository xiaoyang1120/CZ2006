import React, {Component} from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Navbar from "../Components/NavBar";
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
const styles = theme => ({
  root: {
    display: "flex",
    backgroundColor: "#3f51b5",
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

class SecondaryCriteriaMatching extends Component{
  constructor(props){
    super(props)
    this.state={
      //boolCri:sessionStorage.getItem(boolCriterion),
    }
  }

  render(){
    return(
      <div>
        <h1>Just blank~</h1>
      </div>
    )
  }
}

export default SecondaryCriteriaMatching;
