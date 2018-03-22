import React from "react";
import { auth } from "../../firebase/controller";
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'

class SignOut extends React.Component {
  constructor(props) {
    super(props)
  }

  logOut = (event) => {
    event.preventDefault()
    const { unsetAuthAfterSignOut } = this.props
    auth.signOut()
    unsetAuthAfterSignOut()
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

const mapDispatchToProps = (dispatch) => {
  return {
    unsetAuthAfterSignOut: () => dispatch({ type: 'UNSET_AUTH' })
  }
}

export default compose(withRouter, connect(null, mapDispatchToProps))(SignOut);
