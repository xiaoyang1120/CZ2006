import React, {Component} from "react";

class AreaCard extends Component{
    #areaName
    #nailMap
    #icon
    #map

    constructor(areaName, nailMap, icon, map) {
        super();
        this.#areaName = areaName
        this.#nailMap = nailMap
        this.#icon = icon
        this.#map = map
    }

    click(){}
    displayCard(){}
    displayInfo(){}
    checkDetail(){}

    render() {
        return (
            <div></div>
        )
    }
}

export default AreaCard