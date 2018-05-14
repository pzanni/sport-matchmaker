import React from 'react'
import { connect } from 'react-redux'
import { setChallengeResult } from '../../reducers/challenges'

import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'

const styles = {
  inputField: { width: '5%' }
}

const ScoreBoard = (props) => {
  const { setAmount } = props
  const board = []
  for (let i = 0; i < setAmount * 2; i++) {
    let inputFieldP1
    if (i === setAmount - 1) {
      //div caused an unnecessary linebreak -> span works
      inputFieldP1 = <span><input style={styles.inputField} maxLength="1" value={i} /> <br /></span>
    } else {
      inputFieldP1 = <input style={styles.inputField} maxLength="1" value={i} />
    }
    board.push(inputFieldP1)
  }
  return (
    <div>
      {board}
    </div>
  )
}

class MatchResultDialog extends React.Component {
  state = {
    open: false

  }

  handleClick = () => {
    this.setState({ open: !this.state.open })
  }

  submitResult = () => {
    const { challenge, setChallengeResult } = this.props
    //Mock result
    const options = {
      path: challenge.path,
      match: {
        player1: [6, 6, 5, 6],
        player2: [4, 4, 7, 2]
      }
    }
    setChallengeResult(options)
    // Send proposed match data to firebase
    // Opponent will have the opportunity to check / confirm result afterwards
    // Call handleClick function afterwards - could add a spinner etc while data is being sent?
    // 1. Press 'Submit'
    // 2. Spinner on
    // 3. Await passes (call setState back to false below it)
    // 4. Profit ???
    this.handleClick()
  }

  render() {
    const { challenge } = this.props
    // const {open} = this.state
    // console.log('dialog open state?', open)
    // console.log('Challenge from within MatchResultDialog', challenge)
    return (
      <div>
        <Button variant="raised" onClick={this.handleClick}>Result</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClick}>
          <DialogTitle>{"Match result"}</DialogTitle>
          <DialogContent>
            <DialogContentText>Match result for 1 set game</DialogContentText>
            <ScoreBoard setAmount={1} />
            <DialogContentText>Match result for 3 set game</DialogContentText>
            <ScoreBoard setAmount={3} />
            <DialogContentText>Match result for 5 set game</DialogContentText>
            <ScoreBoard setAmount={5} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClick}>
              Cancel
            </Button>
            <Button onClick={this.submitResult} variant="raised" color="primary" autoFocus>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setChallengeResult: (path) => dispatch(setChallengeResult(path))
  }
}
export default connect(null, mapDispatchToProps)(MatchResultDialog)
