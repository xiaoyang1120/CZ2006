import React, {Component} from "react";
import {  Tooltip,
          Badge,
          IconButton,
          } from '@material-ui/core';
import {  purple,
          orange,
          lightGreen,
          lightBlue,
          red,
          brown,
          green,
          } from '@material-ui/core/colors';
import SchoolIcon from '@material-ui/icons/School';
import SmsFailedIcon from '@material-ui/icons/SmsFailed';
import SubwayIcon from '@material-ui/icons/Subway';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
//import many icons
class SomeIcon extends Component{
  constructor(props) {
    super(props);
    //this.convertToAttr=this.convertToAttr.bind(this);
  }

  render(){
    const {cri, disInfo}=this.props;
    //I need: districtId, districtList
    var attrName;
    var icon;
    const hoverText=cri.charAt(0) + cri.split("_").join(" ").toLowerCase().slice(1);
    switch(cri){
      case "PRIMARY_SCHOOL":
        attrName="numOfPrimary";
        icon=<SchoolIcon style={{color:orange[400], fontSize:40}}/>
        break;
      case "SECONDARY_SCHOOL":
        attrName="numOfSecondary";
        icon=<SchoolIcon style={{color:purple[400], fontSize:40}}/>
        break;
      case "JUNIOR_COLLEGE":
        attrName="numOfJc";
        icon=<SchoolIcon style={{color:lightBlue[500], fontSize:40}}/>
        break;
      case "MIXED_SCHOOL":
        attrName="numOfMixed";
        icon=<SchoolIcon style={{color:lightGreen[500], fontSize:40}}/>
        break;
      case "MRT":
        attrName="numOfMRT";
        icon=<SubwayIcon style={{color:red[600], fontSize:40}}/>
        break;
      case "HAWKER_CENTER":
        attrName="numOfHawkerCentre";
        icon=<RestaurantIcon style={{color:brown[500], fontSize:40}}/>
        break;
      case "PARK":
        attrName="numOfPark";
        icon=<NaturePeopleIcon style={{color:green[500], fontSize:40}}/>
        break;
      case "CLINIC":
        attrName="numOfClinic";
        icon=<LocalHospitalIcon style={{color:red[900], fontSize:40}}/>
        break;
      case "SUPERMARKET":
        attrName="numOfSupermarket";
        icon=<ShoppingCartIcon style={{color:purple[600], fontSize:40}}/>
        break;
      case "PREMIUM_BUS":
        attrName="numOfPremiumBus";
        icon=<DirectionsBusIcon style={{color:lightBlue[800], fontSize:40}}/>
        break;
      case "E_WASTE":
        attrName="numOfEWaste";
        icon=<DeleteSweepIcon style={{fontSize:40}}/>
        break;
      default:
        attrName="";
        icon=<SmsFailedIcon style={{ fontSize: 40 }} />
    }

    return(
      <Tooltip  title={hoverText}
                aria-label={cri}
                arrow>
        <Badge  color="secondary"
              badgeContent={disInfo[attrName]}
              showZero>
          <IconButton>
            {icon}
          </IconButton>
        </Badge>
      </Tooltip>



    )
  }
}

export default SomeIcon;
