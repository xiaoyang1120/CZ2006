import React, {Component} from "react";
//import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";
// import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// import FormLabel from '@material-ui/core/FormLabel';
//import FormControl from '@material-ui/core/FormControl';
//import FormHelperText from '@material-ui/core/FormHelperText';
import axios from 'axios';
import Navbar from "../Components/NavBar";
//import testData from "../Data/testData";
import {Redirect} from 'react-router-dom';

//css styles unused for now
const styles = theme => ({
  root: {
    display: 'flex',
    // backgroundColor: "#9fa8da",
    "& > *": {margin: theme.spacing(1)},
//     position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'
  },

  selectedStyle:{
    color: 'yellow'
  }
});

class PrimaryCriteriaMatching extends Component{
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      criterion: [],
      boolCri: [],//format of each item: {id:1, name: "PRI_SCHOOL_XXX", isChecked: false}
      checked: [], //format of the object: {"CRI1", "CRI2", "CRI3"}
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    fetch("http://5e7ce96f71384.freetunnel.cc/api/criteria/get_all")
      .then(response=> response.json())
      .then(data=>{
        console.log("After fetching:", data);
        var list=[];
        var i=0;
        for (const cri of data){
          i++;
          list.push({
            id: i, name: cri, isChecked: false
          });
        };
        this.setState({
          criterion: data,
          loading: false,
          boolCri: list,
        })
      });
    };
  // const handleChange = event => {
  //   setState({ ...state, [event.target.name]: event.target.checked });
  // };
  handleChange(event){
    const {name, checked} = event.target;
    this.setState(prevState => {//use .map
      const updatedCri = prevState.boolCri.map(cri => {
        if (cri.name === name){
          cri.isChecked = checked;
        };
        return cri;
      })
      //update checked[]
      var list=[];
      updatedCri.map(cri=>{
        if (cri.isChecked){
          list.push(cri.name);
        };
      })
      console.log("You checked:",list);
      return {
        boolCri: updatedCri,
        checked: list,
      };
    });
  };

  handleSubmit(e){
    //TODO: store the choices to datafile
    //TODO: jump to secondary criterion page
    e.preventDefault();
    //alert("You are submitting " + this.state.checked);
    if (this.state.checked.length != 3){
      alert("You are submitting " + this.state.checked + "Please choose exactly 3 criterion. Try again.");
      return <Redirect to="/criteria" />;
    }
    return <Redirect to="/" />
    // let arr = [];
    // foreach item in this.state.boolCri {
    //   if(item.isChecked === true) {
    //     arr.push(item.name);
    //   }
    // }
    // let data = {
    //   chosenCriteria: arr.toString()
    // };
    // axios.post('https://b843c882.ap.ngrok.io/criteria/get_districts?offset=0', data)
    //       .then(res => console.log(res.data));
  }

  // const {checkedA, checkedB, checkedC, checkedD, checkedE, checkedF, checkedG} = state;
  // const error = [checkedA, checkedB, checkedC, checkedD, checkedE, checkedF, checkedG].filter(v => v).length !== 3;
//required error={error}
  render(){
    // console.log("this.state.boolCri: " + this.state.boolCri)
    const text = this.state.loading ? "Loading..." : null;
    //styles
    const unselectedStyle={
      color: "white",
    };
    const criItems = this.state.boolCri.map(item =>
      <FormControlLabel
        control={<Checkbox  name={item.name}
                            icon={<FavoriteBorder />}
                            checkedIcon={<Favorite />}
                            checked={item.isChecked}
                            onChange={this.handleChange}
                />}
        label={item.name}
        key={item.id}
      />
    );

    return(
      <div>
        <Navbar />
        <h2 style={unselectedStyle}>Choose exactly 3 primary criterion:</h2>
        <h2>{text}</h2>
        <form onSubmit={this.handleSubmit}>
          {criItems}
          <Button type="submit">Next step</Button>
        </form>

      </div>
    )
  }
}
//in button: href="/"
export default PrimaryCriteriaMatching
// import { green } from '@material-ui/core/colors';

// const GreenCheckbox = withStyles({
//   root: {
//     color: green[400],
//     '&$checked': {color: green[600]},
//   },
//   checked: {},
// })(props => <Checkbox color="default" {...props} />);


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
