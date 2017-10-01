import * as actionTypes from '../actions/actionTypes'

const databasesReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.DATABASE_INFO_RECEIVE:
      return action.databases
    default:
      return state
  }
}

export default databasesReducer
