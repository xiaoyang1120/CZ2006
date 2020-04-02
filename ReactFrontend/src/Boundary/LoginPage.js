import React from "react";
import { Button, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import clsx from "clsx";
import axios from "axios";
import Particles from "react-particles-js";
import Navbar from "../Components/NavBar";
import isSimplePwd from "../tool/PasswordCheck";
import md5Encode from "../tool/md5";
import isValidateEmail from "../tool/EmailCheck";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
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
    width: "35ch"
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
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main
  }
}));

const LoginPage = props => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    showPassword: false
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleLoginSubmit = event => {
    axios
      .post(
        "http://5e7ce96f71384.freetunnel.cc/api/user/log_in",
        {
          email: values.email,
          password: md5Encode(values.password)
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.status === "Pass") {
          props.handleLogin(values.email, response.data.UUID);
          props.history.push("/");
        }
      })
      .catch(error => {
        alert("Wrong username or password!");
      });
    event.preventDefault();
  };

  const handleSignUpSubmit = event => {
    if (!isValidateEmail(values.email)) {
      alert("Please enter a valid email address!");
    } else if (isSimplePwd(values.password)) {
      alert("Password is too simple!");
    } else {
      axios
        .post(
          "http://5e7ce96f71384.freetunnel.cc/api/user/sign_up",
          {
            email: values.email,
            password: md5Encode(values.password)
          },
          {
            withCredentials: true
          }
        )
        .then(response => {
          if (response.data.status === "Pass") {
            alert("Sign up success!");
          }
        })
        .catch(error => {
          alert("Sign up error: user email may exist!");
        });
    }
    event.preventDefault();
  };

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
          style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
          component="main"
          maxWidth="xs"
        >
          <div className={classes.paper}>
            <br />
            <br />
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <br />
            <Typography variant="h5">Login Page</Typography>
            <br />
            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant="outlined"
            >
              <InputLabel>Email</InputLabel>
              <OutlinedInput
                id="email"
                type="text"
                value={values.email}
                onChange={handleChange("email")}
                labelWidth={40}
              />
            </FormControl>

            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant="outlined"
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
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
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
            <br />
            <Button
              className={clsx(classes.margin, classes.textField)}
              variant="contained"
              color="primary"
              onClick={handleLoginSubmit}
            >
              Log in
            </Button>

            <Button
              className={clsx(classes.margin, classes.textField)}
              variant="contained"
              color="secondary"
              onClick={handleSignUpSubmit}
            >
              Sign up
            </Button>
            <br />
            <br />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default LoginPage;
