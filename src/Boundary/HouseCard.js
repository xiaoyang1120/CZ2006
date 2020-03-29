import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {Avatar, Paper} from "@material-ui/core";
import deepPurple from "@material-ui/core/colors/deepPurple";
import axios from "axios";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {withRouter} from "react-router-dom";

const styles = (theme) => ({
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
    },
    cardMedia: {
        paddingTop: "56.25%" // 16:9
    },
    cardContent: {
        flexGrow: 1
    },
    avatar: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    }
});


class HouseCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            open: false,
            email: null,
            districtName: "",
            houseData: this.props.houseData, // houseId, image, houseDescription, ownerId, districtId, venue, isAvailable
            isFav: null
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    componentDidMount() {
        this.setState({isLoading: true});
        console.log(this.state.houseData)
        axios.get("http://5e7ce96f71384.freetunnel.cc/api/user/" + this.state.houseData.ownerId + "/get_email")
            .then(response => {
                this.setState({email: response.data})
            }).catch(error => {
            console.log(error)
        })
        axios.get("http://5e7ce96f71384.freetunnel.cc/api/district/" + this.state.houseData.districtId + "/detail")
            .then(response => {
                this.setState({districtName: response.data.districtName})
            }).catch(error => {
            console.log(error)
        })
        axios.get("http://5e7ce96f71384.freetunnel.cc/api/user/" + sessionStorage.getItem("uuid") + "/get_fav")
            .then(response => {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i]["houseId"] === this.state.houseData.houseId) {
                        this.setState({isFav: true})
                        break
                    }
                }
                // console.log(this.state.fav_list)
            }).catch(error => {
            console.log(error)
        })
        this.setState({isLoading: false})
    }

    handleClickOpen() {
        this.setState({open: true})
    }

    handleClose() {
        this.setState({open: false})
    }

    render() {
        const {classes} = this.props
        const data = this.state.houseData
        const districtName = this.state.districtName
        const email = this.state.email
        const isFav = this.state.isFav

        console.log(this.state.isLoading, email, this.props.type !== "own")

        return (
            <div>
                <Card className={classes.card}>
                    {/**Bookmark display check*/}
                    {this.state.isLoading || email == null || this.props.type === "fav" && isFav == null ? (
                        "Loading..."
                    ) : (
                        <div id="card">
                            <CardHeader
                                style={{display: 'flex'}}
                                action={
                                    <IconButton aria-label="settings" onMouseUp={() => {
                                        if (isFav) {
                                            axios.delete("http://5e7ce96f71384.freetunnel.cc/api/house/" + data.houseId
                                                + "/remove_from_fav?email=" + sessionStorage.getItem("uuid"))
                                                .then(response => {
                                                    console.log(response.data)
                                                }).catch(error => {
                                                alert(error)
                                            })
                                        } else {
                                            axios.get("http://5e7ce96f71384.freetunnel.cc/api/house/" + data.houseId
                                                + "/add_to_fav?email=" + sessionStorage.getItem("uuid"))
                                                .then(response => {
                                                    console.log(response.data)
                                                }).catch(error => {
                                                alert(error)
                                            })
                                        }
                                        this.setState({isFav: !isFav})
                                    }}>
                                        {isFav ? <StarIcon/> : <StarBorderIcon/>}
                                    </IconButton>
                                }
                                avatar={
                                    <Avatar className={classes.avatar}>
                                        {email[1] === "@" ? email[0] : email.substring(0, 2)}
                                    </Avatar>
                                }
                                title={email}
                            >
                            </CardHeader>

                            <CardMedia
                                className={classes.cardMedia}
                                image={data.image}
                                title="Image title"
                            />
                            <CardContent className={classes.cardContent}>
                                {/*<Typography gutterBottom variant="h5" component="h2">*/}
                                {/*  {data.venue}*/}
                                {/*</Typography>*/}
                                <Typography gutterBottom variant="h6" component="h2">
                                    Location: {data.venue}
                                </Typography>
                                <Typography gutterBottom variant="h6" component="h2">
                                    District Name: {districtName}
                                </Typography>
                                <Typography gutterBottom variant="h6" component="h2">
                                    Status: {data.isAvailable ? "Available" : "Not Available"}
                                </Typography>
                                <Typography>{data.houseDescription}</Typography>
                            </CardContent>
                            {this.props.type === "own" ?
                                <CardActions>
                                    <Button
                                        size="small"
                                        color="primary"
                                        onClick={this.handleClickOpen /*event => this.props.handleClick(this.props.name)*/}
                                    >
                                        {this.props.buttonName}
                                    </Button>

                                    <Dialog
                                        open={this.state.open}
                                        onClose={this.handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">{"ATTENTION!"}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Are you sure to make the change?
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button
                                                onClick={event => {
                                                    this.handleClose();
                                                    this.props.handleClick(this.props.houseData);
                                                }}
                                                color="primary"
                                            >
                                                Confirm
                                            </Button>
                                            <Button onClick={this.handleClose} color="primary" autoFocus>
                                                Cancel
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </CardActions> : <div></div>
                            }
                        </div>
                    )}
                </Card>

            </div>
        );
    }
}

export default withStyles(styles)(HouseCard);


