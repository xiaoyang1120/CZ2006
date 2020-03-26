import React, {Component} from "react";
//import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
//import Favorite from '@material-ui/icons/Favorite';
//import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
//import FormHelperText from '@material-ui/core/FormHelperText';
import axios from 'axios';
import Navbar from "../Components/NavBar";
import testData from "../Data/testData";
// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//     backgroundColor: "#9fa8da",
//     position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'
//   },
//   formControl: {
//     margin: theme.spacing(5),
//   },
//   headerFont: {
//     fontSize: '25px'
//   }
// }));

class PrimaryCriteriaMatching extends Component{
  constructor(){
    super()
    this.state = {
      loading: true,
      criterion: [],
      boolCri: [],//format of each item: {id:1, name: "PRI_SCHOOL_XXX", isChecked: false}
      checked: [], //format of the object: {"CRI1", "CRI2", "CRI3"}
    }

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    fetch("http://5e7ce96f71384.freetunnel.cc/api/criteria/get_all")
      .then(response=> response.json())
      .then(data=>{
        console.log("After fetching:", data)
        this.setState({
          criterion: data,
          loading: false,
        })
      });
    console.log("After setstate:",this.state.criterion[2]);
    var list=[];
    var i=0;
    for (const cri of this.state.criterion){
      i++;
      list.push({
        id: i, name: cri, isChecked: false
      });
    };
    this.setState({
      boolCri: list
    });
    console.log(this.state.boolCri);
    };
  // const handleChange = event => {
  //   setState({ ...state, [event.target.name]: event.target.checked });
  // };
  handleChange(id){
    this.setState(prevState => {//use .map
      const updatedCri = prevState.boolCri.map(cri => {
        if (cri.id === id){
          cri.isChecked = !cri.isChecked
        }
        return cri
      })
      return {
        boolCri: updatedCri
      }
    })
  }

  submitEditForm(e){
    //TODO: store the choices to datafile
    //TODO: jump to secondary criterion page
    e.preventDefault();
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
    console.log("this.state.boolCri: " + this.state.boolCri)
    const text = this.state.loading ? "Loading..." : this.state.boolCri[1].name;
    return(
      <div>
        <Navbar />
        <p>{text}</p>
      </div>
    )

  }
    // const priCriLabels = this.state.criterion.map(item =>
    //   <FormControlLabel
    //     key={item[key]]}
    //     label={item.}
    //     handleChange={this.handleChange}
    //   />)
    //   //const text = this.state.loading ? "Loading..." : this.state.character.name
    //   return(
    //     <div>
    //       <FormControl
    //         component="fieldset"
    //         onSubmit={(e) => this.submitEditForm(e)}
    //       >
    //         <FormLabel component="legend">Choose 3 primary criterion</FormLabel>
    //         <FormGroup>
    //           {priCriLabels}
    //         <FormGroup>
    //         <br />
    //         <Button
    //           type="submit"
    //           href="/"
    //         >
    //           Next step
    //         </Button>
    //       </FormControl>
    //     </div>
    //   )
    // }
}

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
