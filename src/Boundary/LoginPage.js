import React from "react";
import {Button, Container, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import clsx from "clsx";
import axios from "axios";
import Particles from "react-particles-js";
import Navbar from "../Components/NavBar";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap"
    },
    margin: {
        margin: theme.spacing(1)
    },
    withoutLabel: {
        marginTop: theme.spacing(3)
    },
    textField: {
        width: "25ch"
    },
    typedContainer: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100vw",
        textAlign: "center"
    },
    particlesCanva: {
        position: "absolute"
    }
}));

const LoginPage = (props) => {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        email: "",
        password: "",
        showPassword: false
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

    const handleSubmit = (event) => {
        axios
            .post(
                "http://localhost:8080/api/user/log_in",
                {
                    email: values.email,
                    password: values.password
                },
                {withCredentials: true}
            )
            .then(response => {
                if (response.data.status === "Pass") {
                    props.handleLogin(response.data.UUID);
                    props.history.push("/");
                }
            })
            .catch(error => {
                alert("Login Error!")
            });
        event.preventDefault();
    }

    return (
        <div>
            <Navbar />
            <Particles
                canvasClassName={classes.particlesCanva}
                params={{
                    particles: {
                        number: {
                            value: 60,
                            density: {
                                enable: true
                            }
                        },
                        shape: {
                            type: "circle",
                            strole: {
                                width: 5,
                                color: "white"
                            }
                        },
                        size: {
                            value: 5,
                            random: true,
                            anim: {
                                enable: true,
                                speed: 3,
                                size_min: 0.1,
                                sync: true
                            }
                        }
                    }
                }}
            />
            <div className={classes.typedContainer}>
                <Container
                    style={{backgroundColor: "rgb(255,255,255)"}}
                    component="main"
                    maxWidth="xs"
                >
                    <div style={{textAlign: "center", alignItems: "center"}}>
                        <Typography variant="h6">Login Page</Typography>
                        <FormControl
                            className={clsx(classes.margin, classes.textField)}
                            variant="outlined"
                        >
                            <InputLabel>Email</InputLabel>
                            <OutlinedInput
                                id="user"
                                type="text"
                                value={values.email}
                                onChange={handleChange("email")}
                                labelWidth={74}
                            />
                        </FormControl>
                        <br/>
                        <FormControl
                            className={clsx(classes.margin, classes.textField)}
                            variant="outlined"
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Password
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword ? "text" : "password"}
                                value={values.password}
                                onChange={handleChange("password")}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={70}
                            />
                        </FormControl>
                        <br/>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{marginBottom: "10px", marginRight: "20px"}}
                            onClick={handleSubmit}
                        >
                            Log in
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{marginBottom: "10px", marginLeft: "20px"}}
                        >
                            Sign up
                        </Button>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default LoginPage;
