import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as routes from "../../constants/routes";
import { withRouter } from "react-router-dom";
import { auth } from "../../firebase/controller";

const SignInPage = ({ history }) => {
  return (
    <div>
      <h1>Sign in</h1>
      <SignInForm history={history} />
    </div>
  );
};

class SignInForm extends Component {
  constructor(props) {
    super(props);
  }

  onSubmit = async (event) => {
    event.preventDefault();
    try {
      const email = event.target.email.value;
      const password = event.target.password.value;
      const loggedInUser = await auth.signInWithEmailAndPassword(email, password);
      //Reittien suojaus
      window.localStorage.setItem('user', loggedInUser)
      //Uudelleenohjataan nyt sisäänkirjautunut käyttäjä etusivulle
      this.props.history.push(routes.HOME);
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

export default withRouter(SignInPage);

export { SignInForm, SignUpLink };
