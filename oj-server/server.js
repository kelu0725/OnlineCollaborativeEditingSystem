//https://stackoverflow.com/questions/33703546/difference-between-io-on-and-socket-on-in-socket-io

const express = require('express')
const app = express()
const path = require('path')
const mongoose = require("mongoose")
const http = require('http')
const socketIO = require('socket.io')
const io = socketIO(); //an instance of socketIO
//this io is an instance, pass it to editorSocketService
const editorSocketService = require('./services/editorSocketService')(io)

const restRouter = require("./routes/rest");
const indexRouter = require('./routes/index');

const db = 'mongodb://user:user123@ds157702.mlab.com:57702/bittiger'
mongoose.connect(db)

const port = 3000

app.use('/', indexRouter)
//This will match paths starting with `/`:
app.use('/api/v1',restRouter)
app.use(express.static(path.join(__dirname, '../public/')));
//Serve static content for the app from the “public” directory in the application directory:
//https://expressjs.com/en/4x/api.html#app.use

app.use((req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, '../public')})
})


//initialize server and attach io on it
const server = http.createServer(app)
io.attach(server);
server.listen(port);
server.on('listening', onListening);
//listening event

function onListening(){
    console.log(`This app is listening on port 3000!`)
}
