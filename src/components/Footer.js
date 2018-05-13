import React from 'react'
import { BottomNavigation, Typography } from 'material-ui';
import { Row } from 'simple-flexbox'

const Footer = (props) => {

  return (
    <BottomNavigation className="footer">
      <Row vertical="center" horizontal="center">
        <Typography variant="caption">
          Made by Anton & Anni
        </Typography>
      </Row>
    </BottomNavigation>
  )
}

export default Footer