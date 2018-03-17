import React from "react";
import { auth } from "../../firebase/controller";

class SignOut extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <button onClick={auth.signOut}>Sign out</button>
      </div>
    )
  }
}

export default SignOut;
