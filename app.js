const express = require ('express')

const app = express();
var port = process.env.PORT || 3000;

app.get("/", (request,response) =>{
    response.setHeader('Content-Type','application/json')
    console.log("Bot Atendimento MS - online")
    return response.send("Bot Atendimento MS - online")
})

app.listen(port, () => console.log(`Bot sendo executado na porta ${port}`))