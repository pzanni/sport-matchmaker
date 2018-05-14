import React from 'react'
import { Typography } from 'material-ui';
import { Row } from 'simple-flexbox'

import { messaging } from '../firebase/firebase'

const Footer = (props) => {
  //Footerista luokka -> tämä hoitaisi booleanin tms?
  messaging.onMessage((payload) => {
    console.log('message ', payload.notification.body)
  })

  return (
    <div className="footer">
      <Row vertical="center" horizontal="center">
        <Typography variant="caption">
          Made by Anton & Anni
        </Typography>
      </Row>
    </div>
  )
}

export default Footer