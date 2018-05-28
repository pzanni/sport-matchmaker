import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import List, {
  ListItem
} from 'material-ui/List'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'

import { sendFirebaseMessage } from '../../reducers/challenges'

const styles = {
  MessageWrapper: { borderStyle: 'solid', borderWidth: '2px', wordBreak: 'break-all', marginBottom: '10px' },
  MessageHierarchy: { display: 'flex', flexDirection: 'column' },
  MessageInfo: { fontWeight: '100', fontSize: '12px', marginLeft: '5px', marginTop: '5px' },
  EmptyMessageWrapper: { display: 'flex', justifyContent: 'center' },
  ChatBox: { display: 'flex', justifyContent: 'center' }
}


class ChatDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      content: ''
    }
  }

  handleClick = () => {
    this.setState({
      open: !this.state.open,
    })
  }

  handleMessageChange = (event) => {
    this.setState({ content: event.target.value })
  }

  sendMessage = () => {
    try {
      //challenge from parent component. Rest from redux
      const { challenge, sendFirebaseMessage, users, session } = this.props
      const { content } = this.state

      const currentUser = users.find((user) => user.uid === session.authUser.uid)
      const currentTime = moment().toDate().getTime()
      const sender = currentUser.username
      const path = challenge.path

      sendFirebaseMessage(path, sender, content, currentTime)
      //Clearaus onnistuu JOS JA VAIN JOS textfieldillä on valueattribuutti (tässä staten content)
      this.setState({ content: '' })
    } catch (exception) {
      console.log(exception)
    }
  }

  render() {
    //challenge from parent component. Rest from redux
    const { challenge, session, users } = this.props
    const { content } = this.state
    const sender = users.find((user) => user.uid === session.authUser.uid)
    const ifNoContent = content.length === 0 //Disable button if this is true

    const opponent = challenge.from.uid === session.authUser.uid
      ? challenge.to.username
      : challenge.from.username

    let messageList = []
    //First item can be absolutely anything - could just make a nice img div etc
    // messageList.push(<ListItem key={0} className="list">Say something !!</ListItem>)
    if (challenge.messages) {
      for (let key in challenge.messages) {
        const content = challenge.messages[key].content
        const sender = challenge.messages[key].sender

        const then = challenge.messages[key].timeStamp
        const now = moment().toDate().getTime()
        const result = moment(now).diff(then)
        const humanizedResult = moment.duration(result).humanize()

        messageList.push(
          <ListItem key={key} style={styles.MessageWrapper} className="list" button>
            <div style={styles.MessageHierarchy}>
              <div>{content}</div>
              <div style={styles.MessageInfo}>{sender} __ posted {humanizedResult} ago</div>
            </div>
          </ListItem>)
      }
    } else {
      messageList.push(
        <ListItem key={0} style={styles.EmptyMessageWrapper} button>
          Say hi :)
        </ListItem>)
    }

    return (
      <form>
        <Button color="secondary" variant="raised" size="small" onClick={this.handleClick}>Chat</Button>
        <Dialog open={this.state.open} onClose={this.handleClick}>
          <DialogTitle>Chat w/ {opponent}</DialogTitle>
          <DialogContent>
            <List>
              {messageList}
            </List>
            <TextField
              label="Type your message"
              type="text"
              value={content}
              onChange={this.handleMessageChange}
              style={styles.ChatBox}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClick}>
              Cancel
              </Button>
            <Button disabled={ifNoContent} onClick={this.sendMessage} variant="raised" color="primary">
              Send
            </Button>
          </DialogActions>
        </Dialog>
      </form >
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    session: state.session
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendFirebaseMessage: (path, sender, content, timeStamp) => dispatch(sendFirebaseMessage(path, sender, content, timeStamp))
  }
}

const ConnectedChatDialog = connect(mapStateToProps, mapDispatchToProps)(ChatDialog)
export { ConnectedChatDialog }