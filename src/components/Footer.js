import React from 'react'
import { BottomNavigation, Typography } from 'material-ui';
import { Column, Row } from 'simple-flexbox'

const Footer = (props) => {

  const styles = {
    position: 'relative',
    left: 0,
    bottom: 0,
    right: 0
  }

  return (
    <BottomNavigation style={styles}>
      <Row vertical="center" horizontal="center">
        <Typography variant="caption">
          Made by Anton & Anni
        </Typography>
      </Row>
    </BottomNavigation>
  )
}

export default Footer