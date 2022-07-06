import express from 'express'
import bodyParser from 'body-parser'
import { typeAttend, botOption1 } from './chatTypes.js'

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
    //Pegando as variaveis necessárias para o atendimento
    const chatProtocol = request.body.protocol
    const chatType = request.body.type
    const chatMessage = request.body.message

    //verificando o tipo de mensagem enviada pelo callback do mosia
    if(chatType == 'attend'){
        typeAttend(chatProtocol)
    }

    if(chatType == 'message'){
        if(chatMessage == '0'){
            typeAttend(chatProtocol)
        }
        botOption1(chatProtocol)
    }



    return response.sendStatus(200)
})

app.listen(port, () => console.log(`Bot sendo executado na porta ${port}`))