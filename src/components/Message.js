import React from 'react'

const styles = {
  Message: { borderBottomStyle: 'solid 1px', wordWrap: 'break-word', width: '50%', margin: 'auto' }
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