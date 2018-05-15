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
  inputField: { width: '5%' },
  resultBorder: { borderStyle: 'solid', borderWidth: '1px' }
}

const ScoreBoard = (props) => {
  const { setAmount } = props
  const board = []
  for (let i = 0; i < setAmount * 2; i++) {
    let inputFieldP1
    if (i === setAmount - 1) {
      //div caused an unnecessary linebreak -> span works
      inputFieldP1 =
        <span key={i}>
          <input style={styles.inputField} maxLength="1" defaultValue={i} /> <br />
        </span>
    } else {
      inputFieldP1 =
        <input key={i} style={styles.inputField} maxLength="1" defaultValue={i} />
    }
    board.push(inputFieldP1)
  }

  return (
    <div style={styles.resultBorder}>
      {board}
    </div>
  )
}

const SetSelector = (props) => {
  const { changeSetAmount } = props
  return (
    <select onChange={changeSetAmount}>
      {/* Korjataan css 1 erän suhteen inputfieldeissä ensiksi */}
      {/* <option value="1">1</option> */}
      <option value="3">3</option>
      <option value="5">5</option>
    </select>
  )
}

const MatchResult = (props) => {
  const { setAmount, changeSetAmount } = props
  return (
    <div>
      <ScoreBoard setAmount={setAmount} />
      <SetSelector changeSetAmount={changeSetAmount} />
    </div>
  )
}

class MatchResultDialog extends React.Component {
  state = {
    open: false,
    sets: 3, //Default value
    result: [6, 4, 4, 6, 6, 4, 6, 6, 3, 7] // For testing purposes only
    // result: Array(10).fill(0) // Use this in the final version
  }

  handleClick = () => {
    this.setState({ open: !this.state.open })
  }

  changeSetAmount = (event) => {
    this.setState({ sets: event.target.value })
  }

  submitResult = () => {
    const { challenge, setChallengeResult } = this.props
    const { sets, result } = this.state
    const p1Result = result.slice(0, sets)
    const p2Result = result.slice(sets, sets * 2)
    console.log('P1 result', p1Result)
    console.log('P2 result', p2Result)
    const options = {
      path: challenge.path,
      match: { p1Result, p2Result }
    }

    //Commented out, use this when input fields have been connected to the result array
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
    const { sets } = this.state
    const { challenge } = this.props

    return (
      <div>
        <Button variant="raised" onClick={this.handleClick}>Result</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClick}>
          <DialogTitle>{`Match result versus ${challenge.from.username}`}</DialogTitle>
          <DialogContent>
            <DialogContentText>Match result for {sets} set game</DialogContentText>
            <MatchResult setAmount={sets} changeSetAmount={this.changeSetAmount} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClick}>
              Cancel
            </Button>
            <Button onClick={this.submitResult} variant="raised" color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div >
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setChallengeResult: (path) => dispatch(setChallengeResult(path))
  }
}
export default connect(null, mapDispatchToProps)(MatchResultDialog)
