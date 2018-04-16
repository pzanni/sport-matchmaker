import React from 'react';
import SignInPage from './SignIn';

const LandingPage = props => {
    return (
        //Puppeteeria varten, muokataan tätä sivua mahdollisesti myöhemmin
        <div className="landing">
            <h1>Landing Page</h1>
            <SignInPage />
        </div>
    )
}

export default LandingPage;