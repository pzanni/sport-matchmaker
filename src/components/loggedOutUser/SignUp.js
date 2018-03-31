import React from "react";
import { auth } from "../../firebase/controller";
import { withRouter } from "react-router-dom";
import * as routes from "../../constants/routes";
import { addFirebaseUser } from '../../reducers/users'
import { connect } from 'react-redux'
import { compose } from 'recompose'

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password1: "",
      password2: ""
    };
  }

  onSubmit = async (event) => {
    event.preventDefault();
    try {
      //HUOM - ERI KUIN importti, tämä on dispatchattu, mutta samanniminen
      const { addFirebaseUser } = this.props

      const email = event.target.email.value;
      const password = this.state.password1;
      const username = event.target.username.value;

      const createdUser = await auth.createUserWithEmailAndPassword(email, password);
      const updatedUser = await createdUser.updateProfile({ displayName: username })
      console.log('luotu käyttäjä', updatedUser)

      //Yhdistellään reduxia ja firebasea
      const newUserData = { username, email, uid: createdUser.uid }
      addFirebaseUser(newUserData)

      window.localStorage.setItem('user', createdUser)
      this.props.history.push(routes.HOME);

    } catch (exception) {
      console.log(exception);
    }
  };

  handleFieldChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { password1, password2 } = this.state;
    const ifInvalidCondition = password1 !== password2 || password1.length === 0;
    return (
      <div>
        <h1>Sign up Page</h1>
        <form onSubmit={this.onSubmit}>
          Username: <input type="text" name="username" />
          Email: <input type="text" name="email" />
          Password: <input type="password" name="password1" onChange={this.handleFieldChange} />
          Confirm password: <input type="password" name="password2" onChange={this.handleFieldChange} />
          <button disabled={ifInvalidCondition}>Submit</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFirebaseUser: (content) => dispatch(addFirebaseUser(content))
  }
}

export default compose(withRouter, connect(null, mapDispatchToProps))(SignUpPage)
