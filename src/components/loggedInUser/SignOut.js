import React from "react";
import { auth } from "../../firebase/controller";
import { withRouter } from 'react-router-dom'

class SignOut extends React.Component {
  constructor(props) {
    super(props)
  }

  logOut = (event) => {
    event.preventDefault()
    auth.signOut()
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <button onClick={this.logOut}>Sign out</button>
      </div>
    )
  }
}

export default withRouter(SignOut)
