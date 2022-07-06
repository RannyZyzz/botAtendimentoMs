import express from 'express'
import bodyParser from 'body-parser'
import { typeAttend, botOption1, botOption2, botOption3, botOption4, botWrongOption } from './chatTypes.js'

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
    //Primeiro atendimento Menu Principal
    if(chatType == 'attend'){
        typeAttend(chatProtocol)
    }

    //acoes possiveis para: opcao1 
    if(chatType == 'message' && chatMessage != '0' && chatMessage != '2' && chatMessage != '3' && chatMessage != '4'){
        botOption1(chatProtocol)
    }
    else if(chatType == 'message' && chatMessage == '0'){
        typeAttend(chatProtocol)
    }
    else if(chatType == 'message' && chatMessage == '4'){
        botOption4(chatProtocol)
    }

    //acoes possiveis para: opcao2
    else if(chatType == 'message' && chatMessage == '2'){
        botOption2(chatProtocol)
    }

    //acoes possiveis para: opcao3
    else if(chatType == 'message' && chatMessage == '3'){
        botOption3(chatProtocol)
    }

    else if(chatType == 'message' && (chatMessage != '0' || chatMessage != '1' || chatMessage != '2' || chatMessage != '3' || chatMessage != '4')){
        botWrongOption(chatProtocol,chatType)
    }



    return response.sendStatus(200)
})

app.listen(port, () => console.log(`Bot sendo executado na porta ${port}`))