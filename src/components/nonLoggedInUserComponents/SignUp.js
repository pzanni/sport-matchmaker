import React from "react";
import { auth } from "../../firebase/controller";

const SignUpPage = () => {
  return (
    <div>
      <h1>Sign up Page</h1>
      <SignUpForm />
    </div>
  );
};

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
  }

  onSubmit = async event => {
    event.preventDefault();
    try {
      const email = event.target.email.value;
      const password = event.target.password.value;
      const createdUser = await auth.createUserWithEmailAndPassword(email, password);
      console.log(`Käyttäjä luotu -> ${createdUser}`);
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
      </div>
    );
  }
}

export default SignUpPage;
