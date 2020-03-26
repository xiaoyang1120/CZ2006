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
      loading: false,
      criterion:{},
      boolCri: {},//format of each item: {id:1, name:PRI_SCHOOL_XXX, isChecked: false}
      checked: {}, //format of the object: {"CRI1", "CRI2", "CRI3"}
    }
    this.handleChange = this.handleChange.bind(this)
  }
  // const [state, setState] = React.useState({
  //   checkedA: true,//checkedPSchool..etc
  //   checkedB: false,
  //   checkedC: false,
  //   checkedD: true,

  //   });
  componentDidMount(){
      this.setState({loading: true})
      fetch("https://b843c882.ap.ngrok.io/criteria/get_all")
        .then(response=> response.json())
        .then(data=>{
          this.setState({
            criterion: data,
            loading: false,
          })
        })
    }
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
    let arr = [];
    // for (var key in this.state.criterion) {
    //   if(this.state.criterion[key] === true) {
    //     arr.push(key);
    //   }
    // }
    // let data = {
    //   chosenCriteria: arr.toString()
    // };
    // axios.post('http://localhost:3000/checks/add', data)
    //       .then(res => console.log(res.data));
}

  // const {checkedA, checkedB, checkedC, checkedD, checkedE, checkedF, checkedG} = state;
  // const error = [checkedA, checkedB, checkedC, checkedD, checkedE, checkedF, checkedG].filter(v => v).length !== 3;
//required error={error}
  render(){
    const text = this.state.loading ? "Loading..." : this.state.criterion[0]
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
