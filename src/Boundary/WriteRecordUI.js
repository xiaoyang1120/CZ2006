import React, {Component} from "react";

class WriteRecordUI extends Component{
    #user
    #record

    constructor(user, record) {
        super()
        this.#user = user
        this.#record = record
    }

    isRecordValid(){return true;}

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default WriteRecordUI