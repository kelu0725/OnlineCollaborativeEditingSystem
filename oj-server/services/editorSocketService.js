import redisClient = require('../modules/redisClient');

const TIMEOUT_IN_SECONDS = 3600;

module.exports = function(io){
  //collaboration sessions
  const collaborations = {};
  //a path for redis
  const sessionPath = '/temp_session';
  //map from socketId to session Id
  const socketIdToSessionId = {};


//https://stackoverflow.com/questions/33703546/difference-between-io-on-and-socket-on-in-socket-io
//1.IO: a Socket.IO server instance attached to an instance of http.Server listening for incoming events.
//2.Socket: an argument, of the connection event listener callback function is an object
//  that represents an incoming socket connection from a client.

  io.on('connection', (socket) => {
    //get sessionId from client
    const sessionId = socket.handshake.query['sessionId'];
    //socketid is userId, every user is working on a sessionId
    socketIdToSessionId[socket.id] = sessionId;

    if(!(sessionId in collaborations)){
     //no one is working on the problem, nothing in the memory, get content from redis
      redisClient.get(sessionPath + "/" + sessionId, data =>{
        if(data){ //redis is not empty, get content from redis
          console.log('session terminated previously, pulling back from redis');
          collaborations[sessionId] = {
            'cachedInstructions:' : JSON.parse(data),
            'participants':[]
          }
        }else{//empty redis, no one has worked on this question， creating new session
          console.log('creating new session');
          collaborations[sessionId] = {
            'cachedInstructions' : [],
            'participants':[]
          }
        }
      });
    }
      //add the current user to the memory list
     collaborations[sessionId]['participants'].push(socket.id);

    //listen to client, if change event is received, send the changes to everyone else
    //this user is making changes
    socket.on('change', delta => {
      //find the problem this user is working at
      const sessionId = socketIdToSessionId[socket.id];

      if(sessionId in collaborations) {
        collaborations[sessionId]['cachedInstructions'].push['change', delta, Date.now()];
        //cachedInstructions:[{"change": delta, date}]
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

    //listen to client, send the instructions from memory to client
    socket.on('restoreBuffer', () => {
      const sessionId = socketIdToSessionId[socket.id];
      if(sessionId in collaborations){
        const instructions = collaborations[sessionId]['cachedInstructions'];
        for(let instruction of instructions){
          socket.emit(instruction[0], instruction[1]);
        }
      }
    })

//when everyone leaves, save the content to redis
    socket.on('disconnect', () => {
      const sessionId = socketIdToSessionId[socket.id];
      let foundAndRemove = false;
      if(sessionId in collaborations){
        const participants = collaborations[sessionId]['participants'];
        const index = participants.indexOf(socket.id);
        //if not found, index = -1
        if(index >= 0){
          participants.slice(index, 1); //第几个位置开始删除
          foundAndRemove = true;
          if(participants.length === 0){
            const key = sessionPath + '/' + sessionId;
            const value = JSON.stringify(collaborations[sessionId]['cachedInstructions']);
            redisClient.set(key, value, redisPrint);
            //key,value,callback
            redisClient.expire(key, TIMEOUT_IN_SECONDS);
            delete collaborations[sessionId];
          }
        }
      }

      if(!foundAndRemove){
        console.error('warning')
      }
    })
  });
}
