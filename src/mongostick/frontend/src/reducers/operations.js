import * as actionTypes from '../actions/actionTypes'

const operationsReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.OPERATIONS_RECEIVE:
      return action.operations
    default:
      return state
  }
}

export default operationsReducer
