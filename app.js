const express = require('express')
const app = express()
require('dotenv').config()
const sendCode = require('./controllers/sendCode')
const verificationCode = require('./controllers/verificationCode')
const dataRoute = require('./controllers/controlFlowOfData')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(express.urlencoded({extended: false}))
app.use(sendCode)
app.use(verificationCode)
app.use(dataRoute)

async function start () {
    try {
        app.listen(process.env.PORT || 3000)
        console.log('server connected')
    } catch (err) {
        console.error(err)
    }
}

start()