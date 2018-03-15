import React from "react";
import { auth } from "../../firebase/controller";
import { withRouter } from "react-router-dom";
import * as routes from "../../constants/routes";

const SignUpPage = ({ history }) => {
  return (
    <div>
      <h1>Sign up Page</h1>
      <SignUpForm history={history} />
    </div>
  );
};

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password1: "",
      password2: ""
    };
  }

  onSubmit = async event => {
    event.preventDefault();
    try {
      const email = event.target.email.value;
      const password = this.state.password1;
      const createdUser = await auth.createUserWithEmailAndPassword(email, password);
      console.log(`Käyttäjä luotu -> ${createdUser}`);
      this.props.history.push(routes.HOME);
      /*Localstoragen käyttöä tänne reittien suojaamiseksi*/
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
    console.log(`pw1: ${password1}`);
    console.log(`pw2: ${password2}`);

    return (
      <div>
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

export default withRouter(SignUpPage);
export { SignUpForm };
