import * as actionTypes from '../actions/actionTypes'

const initialState = {
  conf: {
    chainingAllowed: 'N/A'
  },
  members: [],
}

const replicaSetReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REPLICA_INFO_RECEIVE:
      return action.replica_set
    default:
      return state
  }
}

export default replicaSetReducer
