module.exports = function(io){
  //collaboration sessions
  const collaborations = {};

  //map from socketId to session Id
  const socketIdToSessionId = {};


  io.on('connection', (socket) => {
    // console.log('io='+io);
    // console.log('socket='+socket);
    // const message = socket.handshake.query['message'];
    // console.log(message);

    // io.to(socket.id).emit('message', 'editorSocketService says: hehe from server');
    const sessionId = socket.handshake.query['sessionId'];

    socketIdToSessionId[socket.id] = sessionId; //socketid is userId, every user is working on a sessionId

    if(!(sessionId in collaborations)){
      collaborations[sessionId] = {
        'participants' : []
      };
    }
    collaborations[sessionId]['participants'].push(socket.id);

    //send the messeges to other people
    socket.on('change', delta => {
      const sessionId = socketIdToSessionId[socket.id];
      if(sessionId in collaborations) {
        const participants = collaborations[sessionId]['participants'];//array
        for(let participant of participants) {
          //===compares data and type; == only compares data
          if(socket.id !== participant){
             io.to(participant).emit('change', delta);
          }
        }
      }else{
        console.log('error')
      }
    })
  });
}
