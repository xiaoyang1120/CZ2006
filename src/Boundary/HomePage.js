import React, {Component} from 'react'
import NavBar from "../Components/NavBar"

class HomePage extends Component {
  constructor(){
    super()
    this.state={
      isLoggedin: true
    }
  }
    // callLoginUI(){}
    // chooseCriteria(){}
    // aboutUs(){}
    // nextPage(){}
    // back(){}
    render() {
        return (
            <div>
                <NavBar isLoggedin={this.state.isLoggedin}/>
            </div>
        )
    }
}

export default HomePage
