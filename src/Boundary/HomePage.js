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
               <h1>This is my homepage.</h1>
            </div>
        )
    }
}

export default HomePage
