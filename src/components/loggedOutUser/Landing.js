import React from 'react';
import SignInPage from './SignIn';
import { Column, Row } from 'simple-flexbox';
import { Paper } from 'material-ui';

const styles = {
    textAlign: 'center',
    marginTop: 50
}

const LandingPage = props => {
    return (
        //Puppeteeria varten, muokataan tätä sivua mahdollisesti myöhemmin
        <div>
            <Row horizontal='center'>
                <Column flexGrow={0.2} style={styles}>
                    <Paper>
                        <SignInPage />
                    </Paper>
                </Column>
            </Row>
        </div >
    )
}

export default LandingPage;