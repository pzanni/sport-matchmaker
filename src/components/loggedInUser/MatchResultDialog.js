import React from 'react'
import { connect } from 'react-redux'
import { FormControl, FormHelperText, MenuItem, Select, Button } from '@material-ui/core/'
// import Button from 'material-ui/Button'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core/'

import { setChallengeResult } from '../../reducers/challenges'

const styles = {
  resultBorder: { display: 'flex', flexDirection: 'column' },
  setFieldMargin: { marginLeft: '5px' },
  centeredMatchResultInfo: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  innerMatchResultInfo: { display: 'flex', flexDirection: 'row-reverse', marginTop: '10px', marginBottom: '-10px' },
  setSelector: { marginRight: '15px' },
  setPlayerDiv: { marginLeft: '10px', fontSize: '12px' }
}

const ScoreBoard = (props) => {
  const { setAmount, changeScoreBoard, handleFocus, P1, P2 } = props
  const board = [[], []] //2d array (2 indexes)
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < setAmount; j++) {
      const inputField = <input key={j} size={1} maxLength={1} onChange={(event) => changeScoreBoard(i, j, event)} defaultValue={0} onFocus={handleFocus} />
      board[i].push(inputField)
    }
  }

  //Hardcoded indicators for players - this could be changed to select but whats the point?
  board[0].push(<span key={P1} style={styles.setPlayerDiv}>Player 1: {P1}</span>)
  board[1].push(<span key={P2} style={styles.setPlayerDiv}>Player 2: {P2}</span>)
  return (
    <div style={styles.resultBorder}>
      <div>{board[0]}</div>
      <div>{board[1]}</div>
    </div>
  )
}

const SetSelector = (props) => {
  const { changeSetAmount, setAmount } = props
  return (
    <form style={styles.setSelector}>
      <FormControl>
        <Select value={setAmount} onChange={changeSetAmount}>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </Select>
        <FormHelperText>Set amount</FormHelperText>
      </FormControl>
    </form>
  )
}

const MatchResult = (props) => {
  const { setAmount, changeSetAmount, changeScoreBoard, handleFocus, P1, P2 } = props
  return (
    <div style={styles.innerMatchResultInfo}>
      <ScoreBoard setAmount={setAmount} changeScoreBoard={changeScoreBoard} handleFocus={handleFocus} P1={P1} P2={P2} />
      <SetSelector changeSetAmount={changeSetAmount} setAmount={setAmount} />
    </div>
  )
}

//Add new properties in state for other dialogs as well
class MatchResultDialog extends React.Component {
  state = {
    open: false,
    sets: 3, //Default value
    result: [Array(5).fill(0), Array(5).fill(0)]
  }

  handleClick = () => {
    this.setState({
      open: !this.state.open
    })
    this.resetResult()
  }

  resetResult = () => {
    const resetResult = [Array(5).fill(0), Array(5).fill(0)] //Input fields change to 0. Make it same for state
    this.setState({
      result: resetResult
    })
  }

  changeSetAmount = (event) => {
    this.setState({ sets: event.target.value })
  }

  changeScoreBoard = (x, y, event) => {
    // console.log('Row index', x)
    // console.log('Column index', y)
    const { result } = this.state
    let newResult = [...result] // Could also use result.slice()
    // console.log(`Array value of [${x},${y}] = ${result[x][y]}`)
    newResult[x][y] = Number(event.target.value)
    // console.log('Resulting scoreboard', newResult)
    this.setState({ result: newResult })
  }

  submitResult = () => {
    //session from redux state
    const { challenge, setChallengeResult, session } = this.props
    const { sets, result } = this.state

    //P1 and P2 are hardcoded. Change necessary only if teams / doubles etc are introduced.
    const p1Result = { sets: result[0], P1: challenge.from.username }
    const p2Result = { sets: result[1], P2: challenge.to.username }

    const options = {
      path: challenge.path,
      match: { p1Result, p2Result, submitterUid: session.authUser.uid }
    }

    console.log('Submitted options', options)

    setChallengeResult(options)
    this.handleClick()
  }

  handleFocus = (event) => {
    event.target.select()
  }

  render() {
    const { sets, open, result } = this.state
    const { challenge } = this.props
    // console.log('Current scoreboard P1', result[0])
    // console.log('Current scoreboard P2', result[1])

    //COMMENTS BELOW MOVED TO ANOTHER COMPONENT - REMOVE THIS WHEN NEEDED

    //TODO - Conditional rendering for dialog (if challenge.match ... ) else ...
    // If a result has been submitted -> show result in a table format and allow reviewer to accept/decline the result proposed by the other party
    // Accepted result finalizes the challenge (Filter in a similar manner to pending challenges?)
    // Declined result could just be a simple remove and new result would have to be proposed instead (differences should be in the chat)

    //TODO - Adjust scoreboard to discipline (current one for racket sports)
    // console.log('Match result exists? ', challenge.match)

    //Jos ottelulle on asetettu tulos niin
    // 1. Tuloksen ehdottaja odottaa vastustajaa
    // 2. Toinen osapuoli saa näkyville ehdotetun tuloksen ja saa päättää hyväksyäkö se vai ei
    return (
      <div>
        <MatchInputDialog
          handleClick={this.handleClick}
          open={open}
          challenge={challenge}
          sets={sets}
          changeSetAmount={this.changeSetAmount}
          changeScoreBoard={this.changeScoreBoard}
          handleFocus={this.handleFocus}
          submitResult={this.submitResult}
        />
      </div>
    )
  }
}

const MatchInputDialog = (props) => {
  const { handleClick, open, challenge, sets, changeSetAmount, changeScoreBoard, handleFocus, submitResult } = props
  return (
    <div>
      <Button variant="raised" size="small" color="primary" onClick={handleClick}>Submit result</Button>
      <Dialog open={open} onClose={handleClick}>
        <DialogTitle>{`Submit your ${challenge.discipline} match result`}</DialogTitle>
        <DialogContent style={styles.centeredMatchResultInfo}>
          <DialogContentText>Match result for {sets} set game</DialogContentText>
          <MatchResult setAmount={sets} changeSetAmount={changeSetAmount} changeScoreBoard={changeScoreBoard} handleFocus={handleFocus} P1={challenge.from.username} P2={challenge.to.username} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick}>
            Cancel
          </Button>
          <Button onClick={submitResult} variant="raised" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    session: state.session
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setChallengeResult: (options) => dispatch(setChallengeResult(options))
  }
}

const ConnectedMatchResultDialog = connect(mapStateToProps, mapDispatchToProps)(MatchResultDialog)
export { ConnectedMatchResultDialog }
