import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import HouseCard from "../Boundary/HouseCard";
import {withStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {Typography} from "@material-ui/core";
import {withRouter} from "react-router-dom";

const styles = theme => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8)
    }
});

class OnSale extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            saleHouse: [] // format: houseId, image, houseDescription, ownerId, districtId, venue, available
        };
        this.Update = this.Update.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});
        fetch(
            "/api/user/" + sessionStorage.getItem("uuid") + "/get_posted"
        )
            .then(response => response.json())
            .then(data => this.setState({isLoading: false, saleHouse: data}));
    }

    dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, {
            type: mime
        });
    }


    Update(data) {
        // format: houseId, image, houseDescription, ownerId, districtId, venue, available
        this.props.history.push({
            pathname: "/upload",
            state: {
                houseId: data.houseId,
                image: data.image,
                imageName: this.dataURLtoFile(data.image, "Previous Image").name,
                houseDescription: data.houseDescription,
                isAvailable: data.isAvailable,
                districtId: data.districtId,
                venue: data.venue,
                postal: data.postal,
            }
        })
        // console.log("Update!" + id);
        // this.setState(prevState => {
        //   const updatedHs = prevState.saleHouse.map(hs => {
        //     if (hs.houseID === id) {
        //       hs.status = !hs.status;
        //     }
        //     return hs;
        //   });
        //   return {
        //     saleHouse: updatedHs
        //   };
        // });
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                {
                    <Container className={classes.cardGrid} maxWidth="md">
                        <Typography variant="h3">House On Sale</Typography>
                        <br/>
                        {this.state.isLoading ? (
                            "Loading..."
                        ) : this.state.saleHouse == null ? (
                            "No Houses found"
                        ) : (
                            <Grid container spacing={4}>
                                {this.state.saleHouse.map(saleHouse => (
                                    <Grid item key={saleHouse.houseId} xs={12} sm={6} md={4}>
                                        <HouseCard
                                            houseData={saleHouse}
                                            type="own"
                                            buttonName="Update"
                                            handleClick={this.Update}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Container>
                }
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(OnSale));
