import * as actionTypes from '../actions/actionTypes'

const socketReducer = (state = {status: 'disconnected'}, action) => {
  switch (action.type) {
    case actionTypes.CONNECTION:
      return {
        status: action.status
      }
    default:
      return state
  }
}

export default socketReducer
