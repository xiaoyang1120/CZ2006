import React from "react";
import { makeStyles } from "@material-ui/core/styles";
//import { withStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: "#9fa8da",
    position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'
  },
  formControl: {
    margin: theme.spacing(5),
  },
  headerFont: {
    fontSize: '25px'
  }
}));

export default function PrimaryCriteriaMatching() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: true,//checkedPSchool..etc
    checkedB: false,
    checkedC: false,
    checkedD: true,
    checkedE: true,
    checkedF: false
    //checkedCriterion:["A", "D", "E"]
  });

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const handleClick = (event) => {
    //TODO: store the choices to datafile
    //TODO: jump to secondary criterion page
        // event.preventDefault();
        // let arr = [];
        // for (var key in state) {
        //   if(state[key] === true) {
        //     arr.push(key);
        //   }
        // }
        // let data = {
        //   check: arr.toString()
        // };
        // axios.post('http://localhost:3000/checks/add', data)
        //       .then(res => console.log(res.data));
      }

  const {checkedA, checkedB, checkedC, checkedD, checkedE, checkedF} = state;
  const error = [checkedA, checkedB, checkedC, checkedD, checkedE, checkedF].filter(v => v).length !== 3;

  return (
    <div className={classes.root}>
      <FormControl required error={error} component="fieldset" className={classes.formControl}>
        <FormLabel className={classes.headerFont} component="legend">Choose 3 primary criterion</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox name="checkedA"
                      icon={<FavoriteBorder />} checkedIcon={<Favorite />}
                      checked={state.checkedA} onChange={handleChange} />}
            label="Cri1"
          />
          <FormControlLabel
            control={<Checkbox name="checkedB"
                      icon={<FavoriteBorder />} checkedIcon={<Favorite />}
                      checked={state.checkedB} onChange={handleChange} />}
            label="Cri2"
          />
          <FormControlLabel
            control={<Checkbox name="checkedC"
                      icon={<FavoriteBorder />} checkedIcon={<Favorite />}
                      checked={state.checkedC} onChange={handleChange} />}
            label="Cri3"
          />
        </FormGroup>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox name="checkedD"
                      icon={<FavoriteBorder />} checkedIcon={<Favorite />}
                      checked={state.checkedD} onChange={handleChange} />}
            label="Cri4"
          />
          <FormControlLabel
            control={<Checkbox name="checkedE"
                      icon={<FavoriteBorder />} checkedIcon={<Favorite />}
                      checked={state.checkedE} onChange={handleChange} />}
            label="Cri5"
          />
          <FormControlLabel
            control={<Checkbox name="checkedF"
                      icon={<FavoriteBorder />} checkedIcon={<Favorite />}
                      checked={state.checkedF} onChange={handleChange} />}
            label="Cri6"
          />
          <FormControlLabel
            control={<Checkbox name="checkedF"
                      icon={<FavoriteBorder />} checkedIcon={<Favorite />}
                      checked={state.checkedG} onChange={handleChange} />}
            label="Cri7"
          />
        </FormGroup>
        <FormHelperText />
        <br />
        <Button
          disabled={error? true: false}
          onClick={handleClick}
          href="/"
        >
          Next step
        </Button>
      </FormControl>

    </div>
  );
}
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
