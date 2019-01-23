const express = require('express')
const app = express()
const port = 3000
const restRouter = require("./routes/rest")

// app.get('/', (req, res) => res.send('Hello World!'))
app.use('/api/v1',restRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
