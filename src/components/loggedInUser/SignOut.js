import React from "react";
import { auth } from "../../firebase/controller";
import { withRouter } from 'react-router-dom'
import { Button } from 'material-ui';

class SignOut extends React.Component {
  logOut = (event) => {
    event.preventDefault()
    auth.signOut()
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <Button onClick={this.logOut} variant="raised">
          Sign out
        </Button>
      </div>
    )
  }
}

export default withRouter(SignOut)
