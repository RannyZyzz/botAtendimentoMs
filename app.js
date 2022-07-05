const express = require ('express')

const app = express();
var port = process.env.PORT || 3000;

app.get("/", (request,response) =>{
    response.setHeader('Content-Type','application/json')
    console.log("Bot Atendimento MS - online")
    return response.send("Bot Atendimento MS - online")
})

app.post("/", (request,response) => {
    if(request.headers['Content-Type'] === 'application/json') return response.status(401).json({
        error: 'Invalid Type',
        message:'Content-Type must be application/json'
    })
    console.log(request.body)
})

app.listen(port, () => console.log(`Bot sendo executado na porta ${port}`))