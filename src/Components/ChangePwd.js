import React from "react";

import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import {Button, Typography} from "@material-ui/core";
import axios from "axios"
import clsx from "clsx";
import InputLabel from "@material-ui/core/InputLabel";
import {withStyles} from "@material-ui/core/styles";
import isSimplePwd from "../Boundary/PasswordCheck";
import md5Encode from "../tool/md5";

const styles = theme => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8)
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
});

class ChangePwd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            newPassword: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(prop) {
        return event => {
            this.setState({[prop]: event.target.value})
        }
    }

    handleSubmit(event) {
        if (isSimplePwd(this.state.newPassword)) {
            alert("New password is too simple!")
        } else {
            axios.post(
                "http://5e7ce96f71384.freetunnel.cc/api/user/change_password",
                {
                    email: md5Encode(sessionStorage.getItem("email")),
                    password: md5Encode(this.state.password),
                    newPassword: md5Encode(this.state.newPassword)
                },
                {withCredentials: true}
            ).then(
                response => {
                    if (response.data.status === "Success") {
                        alert("Password Updated")
                    }
                }
            ).catch(error => {
                alert(error)
            });
        }
        event.preventDefault()
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Typography variant="h3">Change Password</Typography>
                    <br/>
                    <FormControl
                        className={clsx(classes.margin, classes.textField)}
                        variant="outlined"
                    >
                        <InputLabel>Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            type={"password"}
                            value={this.state.password}
                            onChange={this.handleChange("password")}
                            labelWidth={70}
                        />
                    </FormControl>
                    <br/>
                    <FormControl
                        className={clsx(classes.margin, classes.textField)}
                        variant="outlined"
                    >
                        <InputLabel>New Password</InputLabel>
                        <OutlinedInput
                            id="newPassword"
                            type={"password"}
                            value={this.state.newPassword}
                            onChange={this.handleChange("newPassword")}
                            labelWidth={108}
                        />
                    </FormControl>

                    <br/>
                    <FormControl
                        className={clsx(classes.margin)}
                        variant="outlined"
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            style={{marginBottom: "10px", marginRight: "20px"}}
                            onClick={this.handleSubmit}
                        >
                            Change
                        </Button>
                    </FormControl>
                </Container>
            </div>
        );
    }

}

export default withStyles(styles)(ChangePwd)