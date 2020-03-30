import React, {Component} from "react";
import NavBar from "../Components/NavBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "../Components/CopyRight";
import HouseCard from "./HouseCard";
import axios from "axios"

const styles = theme => ({
    icon: {
        marginRight: theme.spacing(2)
    },
    header: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6)
    },
    heroButtons: {
        marginTop: theme.spacing(4)
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8)
    },
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
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6)
    }
});

class HouseList extends Component {
    constructor() {
        super();
        this.state = {
            districtName: null,
            currentDistrict: null,
            isLoading: false,
            House: null
        };
    }

    componentDidMount() {
        const curDis = JSON.parse(sessionStorage.getItem("currentDistrict"));
        this.setState({currentDistrict: curDis, isLoading: true});
        fetch("http://5e7ce96f71384.freetunnel.cc/api/district/" + curDis + "/detail")
            .then(response => response.json())
            .then(data => this.setState({districtName: data.districtName}))
        fetch(
            "http://5e7ce96f71384.freetunnel.cc/api/house/get_list?district_id=" + curDis
        ).then(response => response.json())
            .then(data => this.setState({isLoading: false, House: data}));
    }

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <CssBaseline/>
                <NavBar/>
                <main>
                    {/* Header */}
                    <div
                        className={classes.header}
                        style={{backgroundColor: "transparent", position: "relative"}}
                    >
                        <Container maxWidth="m">
                            <Typography
                                component="h1"
                                variant="h2"
                                align="center"
                                color="textPrimary"
                                gutterBottom
                            >
                                {(this.state.districtName && this.state.House) ? (
                                        this.state.House.length == 0 ?
                                            "Sorry, no house in " + this.state.districtName :
                                            "Houses in " + this.state.districtName
                                    ) :
                                    "District Loading..."
                                }

                            </Typography>
                            <Typography
                                variant="h5"
                                align="center"
                                color="textSecondary"
                                paragraph
                            >
                                There is always a home for you in Singapore.
                            </Typography>
                            <div className={classes.heroButtons}>
                                <Grid container spacing={2} justify="center">
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            href="/arealist"
                                        >
                                            Back to district list
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="outlined" color="primary" href="/criteria">
                                            Reselect Criteria
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </Container>
                    </div>
                    <Container className={classes.cardGrid} maxWidth="md">
                        {/* End header */}
                        {
                            this.state.House ? (
                                this.state.House.length != 0 ?
                                    <Grid container spacing={4}>
                                        {this.state.House.map(House => (
                                            <Grid item key={House.houseId} xs={12} sm={6} md={4}>
                                                <HouseCard
                                                    houseData={House}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                    :
                                    <Typography variant="h6" align="center">You may proceed to another district for houses.</Typography>
                            ) : (
                                <Typography variant="h6" align="center">Loading Houses...</Typography>
                            )

                        }
                    </Container>
                </main>
                {/* Footer */}
                <footer className={classes.footer}>
                    <Typography variant="h6" align="center" gutterBottom>
                        You are at the END now.
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        align="center"
                        color="textSecondary"
                        component="p"
                    >
                        More houses are on the way...
                    </Typography>
                    <Copyright/>
                </footer>
                {/* End footer */}
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(HouseList);
