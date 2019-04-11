const express = require('express')
const app = express()
const path = require('path')
const mongoose = require("mongoose")

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


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
