import * as actionTypes from './actionTypes'

export function connected() {
  return {
    type: actionTypes.CONNECTION,
    status: 'connected',
  }
}


export function disconnected() {
  return {
    type: actionTypes.CONNECTION,
    status: 'disconnected',
  }
}

export function error() {
  return {
    type: actionTypes.CONNECTION,
    status: 'error',
  }
}

export function operationsReceived(payload) {
  return {
    type: actionTypes.OPERATIONS_RECEIVE,
    operations: payload,
  }
}


export function databaseInfoReceived(payload) {
  return {
    type: actionTypes.DATABASE_INFO_RECEIVE,
    databases: payload,
  }
}


export function replicaSetInfoReceiced(payload) {
  return {
    type: actionTypes.REPLICA_INFO_RECEIVE,
    replica_set: payload
  }
}


export function connecting() {
  return {
    type: actionTypes.CONNECTION,
    status: 'connecting',
  }
}


export function connect(url) {
  return {
    type: actionTypes.CONNECT,
    url: url,
  }
}
