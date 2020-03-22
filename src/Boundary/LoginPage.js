import React from 'react'
import {Input, Button} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import clsx from "clsx";
import TextField from "@material-ui/core/TextField";

const useStyles =
    makeStyles(theme => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        margin: {
            margin: theme.spacing(1),
        },
        withoutLabel: {
            marginTop: theme.spacing(3),
        },
        textField: {
            width: '25ch',
        },
    }));

const LoginPage = () => {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        username: '',
        password: '',
        showPassword: false,
    });

    const handleChange = prop => event => {
        setValues({...values, [prop]: event.target.value});
    };

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    return (
        <div style={{textAlign: "center"}}>
            <h2>Login Page</h2>
            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <InputLabel>Username</InputLabel>
                <OutlinedInput
                    id="user"
                    type='text'
                    value={values.username}
                    onChange={handleChange('username')}
                    labelWidth={74}
                    />
            </FormControl>
            <br/>
            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                    labelWidth={70}
                    />
            </FormControl>
            <br/>
            <Button variant="contained" color="primary" style={{marginBottom:'10px', marginRight:'20px'}}>
                Log in
            </Button>
            <Button variant="contained" color="primary" style={{marginBottom:'10px', marginLeft:'20px'}}>
                Sign up
            </Button>
        </div>

    )
}

export default LoginPage