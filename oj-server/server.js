const express = require('express')
const app = express()
const path = require('path')
const mongoose = require("mongoose")
const http = require('http')
const socketIO = require('socket.io')
const io = socketIO(); //initialize socket io, pass it to editorSocketService
const editorSocketService = require('./services/editorSocketService')(io)
//it is a function imported from editorSocketService

const restRouter = require("./routes/rest");
const indexRouter = require('./routes/index');


// const db = process.env.DB_CON;
const db = 'mongodb://user:user123@ds157702.mlab.com:57702/bittiger'
mongoose.connect(db)

const port = 3000

// app.get('/', (req, res) => res.send('Hello World!'))
app.use('/', indexRouter)
app.use('/api/v1',restRouter)
app.use(express.static(path.join(__dirname, '../public/')));

app.use((req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, '../public')})
})


// app.listen(port, () => console.log(`Example app listening on port ${port}!`))


//initialize server and attach io on it
const server = http.createServer(app)
io.attach(server);
server.listen(port);
server.on('listening', onListening);

function onListening(){
    console.log(`This app is listening on port 3000!`)
}
