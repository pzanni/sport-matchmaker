import React from 'react';
import SignInPage from './SignIn';
import BackGround from '../../img/claytennis.jpeg'

const styles = {
    backGround: {
        backgroundImage: `url(${BackGround})`,
        height: '100vh',
    }
}

const LandingPage = (props) => {
    return (
        <div style={styles.backGround}>
            <SignInPage />
        </div>
    )
}

export default LandingPage;