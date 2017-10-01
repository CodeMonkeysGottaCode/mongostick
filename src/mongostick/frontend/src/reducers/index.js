import { combineReducers } from 'redux'

import socket from './socket'
import operations from './operations'
import databases from './databases'
import replica_set from './replica_set'

export default combineReducers({
  socket,
  operations,
  databases,
  replica_set,
})
