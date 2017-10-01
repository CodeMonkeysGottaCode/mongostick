// https://exec64.co.uk/blog/websockets_with_redux/ - Lovely article

import * as actions from '../actions'

const socketMiddleware = (function(){
  let socket = null;

  const onOpen = (ws,store,token) => evt => {
    store.dispatch(actions.connected());
  }

  const onClose = (ws,store) => evt => {
    store.dispatch(actions.disconnected());
  }

  const onMessage = (ws,store) => evt => {
    //Parse the JSON message received on the websocket
    const msg = JSON.parse(evt.data);
    switch(msg.type) {
      case "OPERATIONS":
        store.dispatch(actions.operationsReceived(msg.data));
        break;
      case "DATABASES":
        store.dispatch(actions.databaseInfoReceived(msg.data))
        break;
      case "REPLICA_SET":
        store.dispatch(actions.replicaSetInfoReceiced(msg.data))
        break
      default:
        console.log("Received unknown message type: '" + msg.type + "'");
        break;
    }
  }

  const onError = (ws, store) => evt => {
    store.dispatch(actions.error())
  }

  return store => next => action => {
    switch(action.type) {

      //The user wants us to connect
      case 'CONNECT':
        //Start a new connection to the server
        if(socket !== null) {
          socket.close();
        }
        //Send an action that shows a "connecting..." status for now
        store.dispatch(actions.connecting());

        //Attempt to connect (we could send a 'failed' action on error)
        socket = new WebSocket(action.url)
        socket.onmessage = onMessage(socket,store)
        socket.onclose = onClose(socket,store)
        socket.onopen = onOpen(socket,store,action.token)
        socket.onerror = onError(socket, store)

        break;

      //The user wants us to disconnect
      case 'DISCONNECT':
        if(socket !== null) {
          socket.close();
        }
        socket = null;

        //Set our state to disconnected
        //store.dispatch(actions.disconnected());
        break;

      //Send the 'SEND_MESSAGE' action down the websocket to the server
      case 'SEND_CHAT_MESSAGE':
        socket.send(JSON.stringify(action));
        break;

      //This action is irrelevant to us, pass it on to the next middleware
      default:
        return next(action);
    }
  }

})();

export default socketMiddleware
