import React, { Component } from 'react'
import './App.css'
import Main from './Main'
import { applyMiddleware, compose, createStore } from 'redux'
import { Provider } from 'react-redux'
import socketMiddleware from './middleware/socketMiddleware'
import { connect } from './actions/index'
import reducers from './reducers'


const store = createStore(
  reducers,
  compose(
    applyMiddleware(socketMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
)
store.dispatch(connect('ws://localhost:8888/ws'))


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    )
  }
}

export default App
