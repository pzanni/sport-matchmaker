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
  const { setAmount, changeScoreBoard } = props
  const board = []
  for (let index = 0; index < setAmount * 2; index++) {
    let inputFieldP1
    if (index === setAmount - 1) {
      //div caused an unnecessary linebreak -> span works
      inputFieldP1 =
        <span key={index}>
          <input style={styles.inputField} maxLength="1" name={index} onChange={changeScoreBoard} defaultValue={0} />
          <br />
        </span>
    } else {
      inputFieldP1 =
        <input key={index} style={styles.inputField} maxLength="1" name={index} onChange={changeScoreBoard} defaultValue={0} />
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
  const { setAmount, changeSetAmount, changeScoreBoard } = props
  return (
    <div>
      <ScoreBoard setAmount={setAmount} changeScoreBoard={changeScoreBoard} />
      <SetSelector changeSetAmount={changeSetAmount} />
    </div>
  )
}

class MatchResultDialog extends React.Component {
  state = {
    open: false,
    sets: 3, //Default value
    result: Array(10).fill(0) // Use this in the final version
  }

  handleClick = () => {
    this.setState({ open: !this.state.open })
  }

  changeSetAmount = (event) => {
    this.setState({ sets: event.target.value })
  }

  changeScoreBoard = (event) => {
    const { result } = this.state
    let newResult = [...result] // Could also use result.slice()
    console.log('event.target.name', event.target.name)
    console.log('event.target.value', event.target.value)
    newResult[event.target.name] = Number(event.target.value)
    this.setState({ result: newResult })
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

    setChallengeResult(options)
    this.handleClick()
  }

  render() {
    const { sets, result } = this.state
    const { challenge } = this.props
    console.log('Current result array', result)
    return (
      <div>
        <Button variant="raised" size="small" onClick={this.handleClick}>Submit result</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClick}>
          <DialogTitle>{`Match result versus ${challenge.from.username}`}</DialogTitle>
          <DialogContent>
            <DialogContentText>Match result for {sets} set game</DialogContentText>
            <MatchResult setAmount={sets} changeSetAmount={this.changeSetAmount} changeScoreBoard={this.changeScoreBoard} />
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
