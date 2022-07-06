const express = require ('express')
const bodyParser = require('body-parser')
const { typeAttend } = require('./chatTypes')

const app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", (request,response) =>{
    response.setHeader('Content-Type','application/json')
    console.log("Bot Atendimento MS - online")
    return response.send("Bot Atendimento MS - online")

})

app.post("/", async (request,response) => {
    if(request.headers['Content-Type'] === 'application/json') return response.status(401).json({
        error: 'Invalid Type',
        message:'Content-Type must be application/json'
    })
    
    console.log(request.body)
    const chatProtocol = request.body.protocol
    const chatType = request.body.type
    const chatMessage = request.body.message

    if(chatType == 'attend'){
        typeAttend()
    }

    return response.sendStatus(200)
})

app.listen(port, () => console.log(`Bot sendo executado na porta ${port}`))