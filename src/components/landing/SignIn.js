import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';

const SignInPage = () => {
    return (
        <div>
            <h1>Sign in</h1>
            <SignInForm />
        </div>
    )
}

class SignInForm extends Component {
    constructor(props) {
        super(props);
    }

    onSubmit = (event) => {
        event.preventDefault()
        console.log(event.target.email.value)
        console.log(event.target.password.value)
    }

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
            Don't have an account?
        {' '}
            <Link to={routes.SIGN_UP}>Sign Up</Link>
        </p>
    )
}

export default SignInPage;

export {
    SignInForm,
    SignUpLink,
};