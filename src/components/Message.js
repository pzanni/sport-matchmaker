import React from 'react'

const styles = {
  Message: { borderRadius: '10px', border: '1px solid #222', wordWrap: 'break-word', width: '250px', marginRight: 'auto', marginLeft: 'auto', marginTop: '10px', padding: '10px', color: '#4a4a4a' }
}

const Message = (props) => {
  const { content } = props
  if (content.length > 0) {
    return (
      <div style={styles.Message}>
        {content}
      </div>)
  } else {
    return null
  }
}

export default Message