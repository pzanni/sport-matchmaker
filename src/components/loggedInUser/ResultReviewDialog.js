import React from 'react'
import { connect } from 'react-redux'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText
} from 'material-ui'

import { declineChallengeResult, completeChallenge } from '../../reducers/challenges'

const styles = {
  //effects a match + player combo with others of same type. Make all items start from left (flex-start)
  matchTotalContent: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', borderTop: 'solid', borderWidth: '1px' },
  //effects the relationship inside singular match + player combo. Make all items to be on same row (center)
  matchIndividualContent: { display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '-20px' },
  //remove that <ul/> automated left padding
  listStyle: { listStyleType: 'none', padding: '0' },
  //not sure why display: 'inline' is called here instead of <ul/> --- my css game is incredibly weak ^^
  listCellStyleType: { display: 'inline', marginLeft: '2px', marginBottom: '-5px', padding: '2px', borderStyle: 'solid', borderWidth: '1px' },
  nameBoardPadding: { marginLeft: '10px' }
}

const ProposedResult = (props) => {
  const { match } = props
  const setColumnsP1 = match.p1Result.sets.map((setResult) => <li style={styles.listCellStyleType}>{setResult}</li>)
  const setColumnsP2 = match.p2Result.sets.map((setResult) => <li style={styles.listCellStyleType}>{setResult}</li>)
  return (
    <div style={styles.matchTotalContent}>
      <div style={styles.matchIndividualContent}>
        <ul style={styles.listStyle}>{setColumnsP1}</ul>
        <div style={styles.nameBoardPadding}>{match.p1Result.P1}</div>
      </div>
      <div style={styles.matchIndividualContent}>
        <ul style={styles.listStyle}>{setColumnsP2}</ul>
        <div style={styles.nameBoardPadding}>{match.p2Result.P2}</div>
      </div>
    </div>
  )
}

class ResultReviewDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  handleClick = () => {
    const { open } = this.state
    this.setState({ open: !open })
  }

  declineChallenge = () => {
    const { path, declineChallengeResult } = this.props
    try {
      declineChallengeResult(path)
      this.handleClick()
    } catch (exception) {
      console.log(exception)
    }
  }

  acceptChallenge = () => {
    const { path, completeChallenge } = this.props
    try {
      completeChallenge(path)
      this.handleClick()
    } catch (exception) {
      console.log(exception)
    }
  }

  render() {
    const { open } = this.state
    const { match, path, declineChallengeResult, completeChallenge, canComplete } = this.props
    return (
      <div>
        {canComplete
          ? <Button variant="raised" color="primary" size="small" onClick={this.handleClick}>Proposed result</Button>
          : <Button size="small" style={{ border: '2px solid #B7C6CD', borderRadius: '5px' }} onClick={this.handleClick}>Final result</Button>
        }
        <Dialog open={open} onClose={this.handleClick}>
          <DialogTitle>Match result review</DialogTitle>
          <DialogContent>
            <DialogContentText>Below is the {canComplete ? 'proposed' : 'final'} result</DialogContentText>
            <ProposedResult match={match} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClick}>
              Cancel
            </Button>
            {canComplete
              ?
              <React.Fragment>
                <Button color="secondary" onClick={this.declineChallenge}>
                  Decline
                </Button>
                <Button variant="raised" color="primary" onClick={this.acceptChallenge}>
                  Accept
                </Button>
              </React.Fragment>
              :
              null}
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    declineChallengeResult: (path) => dispatch(declineChallengeResult(path)),
    completeChallenge: (path) => dispatch(completeChallenge(path))
  }
}

const ConnectedResultReviewDialog = connect(null, mapDispatchToProps)(ResultReviewDialog)
export {
  ConnectedResultReviewDialog
}