if(process.env.NODE_ENV !== 'production' ){
    require('dotenv').config()
}
require("./dbconfig")(process.env.MONGOURI)
const express = require('express')
const app = express()
const path = require("path")
const port = process.env.PORT||5000
const morgan = require("morgan")
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(morgan("tiny"))
app.use(express.static( path.join(__dirname, 'public')))

app.use("/api", require("./routes/index"))

app.listen(port,(req,res)=> console.log(`App running at port ${port}`)) 