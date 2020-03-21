import React, {Component} from 'react'

class NavBar extends Component {
  constructor(props){
    super(props)
    this.state={

    }
  }
  render() {
    let logStatusDisplay;
    if (this.props.isLoggedin){//can inherit from Homepage now
      logStatusDisplay = "You are logged in!"
    } else {
      logStatusDisplay = "You haven't logged in yet."
    }
    return (
      <div>
        <h1>Welcome to Real Estatistics.</h1>
        <p>{logStatusDisplay}</p>
        <img src="http://placekitten.com/500/300" alt="This is just a cat."/>
      </div>
    )
  }
}
export default NavBar
