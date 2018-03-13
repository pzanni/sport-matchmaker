import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as routes from "../../constants/routes";

import { auth } from "../../firebase/controller";

const SignInPage = () => {
  return (
    <div>
      <h1>Sign in</h1>
      <SignInForm />
    </div>
  );
};

class SignInForm extends Component {
  constructor(props) {
    super(props);
  }

  onSubmit = async event => {
    event.preventDefault();
    try {
      const email = event.target.email.value;
      console.log(`email : ${email}`);
      const password = event.target.password.value;
      console.log(`pw : ${password}`);

      const loggedInUser = await auth.signInWithEmailAndPassword(email, password);
      console.log(`loggedInUser -> ${loggedInUser}`);
    } catch (exception) {
      console.log(exception);
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          Email: <input type="text" name="email" />
          Password: <input type="password" name="password" />
          <button>Submit</button>
        </form>
        <SignUpLink />
      </div>
    );
  }
}

const SignUpLink = () => {
  return (
    <p>
      Dont have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
    </p>
  );
};

export default SignInPage;

export { SignInForm, SignUpLink };
