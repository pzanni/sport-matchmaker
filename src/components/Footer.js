import React from 'react'
import { Typography } from '@material-ui/core/';
import { Row } from 'simple-flexbox'

const Footer = (props) => {
  return (
    <div className="footer">
      <Row vertical="center" horizontal="center">
        {/* Body not applying color here -> body color applied here */}
        <Typography variant="caption" style={{ color: '#4a4a4a' }}>
          Made by Anton & Anni
        </Typography>
      </Row>
    </div>
  )
}

export default Footer