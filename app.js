import express from 'express'
import bodyParser from 'body-parser'
import { typeAttend, botOption1, botOption2, botOption3, botOption4, botWrongOption, botCallerDontClose, botOption5 } from './chatTypes.js'
import { sendBotMessage } from './mosiaCaller.js';

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
    const chatConfirm = request.body.confirm

    //verificando o tipo de mensagem enviada pelo callback do mosia
    //Primeiro atendimento Menu Principal
    if(chatType == 'attend'){
        await typeAttend(chatProtocol)
    }

    if(chatType == "message"){
        //acoes possiveis para: opcao1 
        if(chatMessage == '0'){
            await typeAttend(chatProtocol)
        }
        else if(chatMessage == '1'){
            await botOption1(chatProtocol)
        }
        //acoes possiveis para: opcao2
        else if(chatMessage == '2'){
            await botOption2(chatProtocol)
           
        }
        //acoes possiveis para: opcao3
        else if(chatMessage == '3'){
            await botOption3(chatProtocol)
        }
        else if(chatMessage == '4'){
            await botOption4(chatProtocol)
        }
        else if(chatMessage == '5' || chatMessage.match(/#*/)){
            await botOption5(chatProtocol,chatMessage)
        }
        else if(chatMessage != '0' || chatMessage != '1' || chatMessage != '2' || chatMessage != '3' || chatMessage != '4' || chatMessage != '5'){
            await botWrongOption(chatProtocol)
        }
    }

    //Em caso do chamador negar o encerramento
    if(chatType == 'close' && chatConfirm == false){
        await botCallerDontClose(chatProtocol)
    }
    
    return response.sendStatus(200)
})

app.listen(port, () => console.log(`Bot sendo executado na porta ${port}`))