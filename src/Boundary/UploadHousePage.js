import React, {cloneElement} from "react";
import Container from "@material-ui/core/Container";
import Navbar from "../Components/NavBar";
import Typography from "@material-ui/core/Typography";

import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import axios from "axios";

const styles = theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(0),
        },
    },
    input: {
        display: 'none',
    },
    cardGrid: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(8)
    },
});

class UploadHousePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            houseDescription: null,
            isAvailable: true,
            districtId: null,
            venue: null,
            postal: null,
            nameList: [],
            idList: [],
        }

        this.handleImage = this.handleImage.bind(this)
        this.handleCheckbox = this.handleCheckbox.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        let nameList = [], idList = []
        axios.get("http://5e7ce96f71384.freetunnel.cc/api/district/get_all")
            .then(response => {
                for (let i = 0; i < response.data.length; i++) {
                    nameList.push(response.data[i].districtName);
                    idList.push(response.data[i].districtId);
                }
                this.setState({nameList: nameList, idList: idList})
            }).catch(error => {
            alert(error)
        })
    }

    handleImage(event) {
        const file = event.target.files[0];
        let reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                this.setState({image: reader.result})
            }
        } else {
            alert("Image read error!")
        }
    }

    handleCheckbox(event) {
        this.setState({isAvailable: event.target.checked})
    }

    handleChange(prop) {
        return event => {
            this.setState({[prop]: event.target.value})
        }
    }

    handleSubmit() {
        if (!this.state.image) {
            alert("Please upload the house image!")
        } else if (!this.state.houseDescription) {
            alert("Please write the house description!")
        } else if (!this.state.districtId) {
            alert("Please specify the district!")
        } else if (!this.state.venue) {
            alert("Please specify the venue!")
        } else if (window.confirm("Confirm to upload your house?")) {
            axios.
                post("http://5e7ce96f71384.freetunnel.cc/api/house/add",
                {
                    image: JSON.stringify(this.state.image),
                    houseDescription: this.state.houseDescription,
                    ownerId: sessionStorage.getItem("uuid"),
                    isAvailable: this.state.isAvailable ? "1" : "0",
                    districtId: this.state.districtId,
                    venue: this.state.venue
                }, {withCredentials: true})
                .then(response => {
                    if (response.data.status === "Added successfully") {
                        alert("House added successfully!")
                        this.props.history.push("/")
                    }
                }).catch(error => {
                    alert(error)
            });
        }
    }


    render() {
        const {classes} = this.props;
        return (
            <div>
                <Navbar/>
                <Container
                    className={classes.cardGrid}
                    style={{backgroundColor: "rgb(255,255,255)"}}
                    component="main"
                    maxWidth="sm"
                >

                    <Typography variant="h5" style={{textAlign: "center"}}>Upload Your House</Typography>

                    <div id="imageUpload" className={classes.root}>
                        <input accept="image/*" className={classes.input} id="icon-button-file" type="file"
                               onChange={this.handleImage}/>
                        <label id="icon-button-file">House Image: </label>
                        <label htmlFor="icon-button-file">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera/>
                            </IconButton>
                        </label>

                    </div>
                    <div id="description" className={classes.root}>
                        <label id="hd">House Description:</label>
                        <br/>
                        <TextField
                            style={{marginTop: 8}}
                            id="hd"
                            label="House Description"
                            multiline
                            rows="4"
                            defaultValue=""
                            variant="outlined"
                            fullWidth={true}
                            onChange={this.handleChange("houseDescription")}
                        />
                    </div>
                    <div id="availability">
                        <label id="checkbox">House Availability:</label>
                        <FormControlLabel
                            style={{marginLeft: 10}}
                            id="checkbox"
                            control={
                                <Checkbox
                                    checked={this.state.isAvailable}
                                    onChange={this.handleCheckbox}
                                    color="primary"
                                />
                            }
                        />
                    </div>
                    <div id="districtName">
                        <InputLabel htmlFor="district" style={{color: "black", marginTop: 10, fontSize: 16}}>District
                            Name</InputLabel>
                        <NativeSelect
                            value={this.state.districtName}
                            onChange={this.handleChange("districtId")}
                            inputProps={{
                                name: 'District Name',
                                id: 'district',
                            }}
                        >
                            <option aria-label="None" value={null}/>
                            {
                                this.state.nameList.map((value, index) => (
                                    <option key={index} value={this.state.idList[index]}>{value}</option>
                                ))
                            }
                        </NativeSelect>
                    </div>

                    <div id="postal" style={{marginTop: 10}}>
                        <label id="postal">Postal Code:</label>
                        <br/>

                        <TextField
                            disabled={true}
                            style={{marginTop: 8}}
                            id="postal"
                            label="Postal Code"
                            defaultValue=""
                            variant="outlined"
                            onChange={this.handleChange("postal")}
                        />
                    </div>

                    <div id="venue" style={{marginTop: 10}}>
                        <label id="venue">Venue:</label>
                        <br/>

                        <TextField
                            style={{marginTop: 8}}
                            id="venue"
                            label="Venue"
                            defaultValue=""
                            variant="outlined"
                            onChange={this.handleChange("venue")}
                        />
                    </div>

                    <Button
                        variant="contained"
                        color="primary"
                        style={{marginTop: 50}}
                        onClick={this.handleSubmit}>
                        Submit
                    </Button>
                </Container>
            </div>
        );
    }
}

export default withStyles(styles)(UploadHousePage);