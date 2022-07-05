const express = require ('express')
const bodyParser = require('body-parser')
const { EventEmitter } = require('events')

const app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

class Stater extends EventEmitter {
	constructor(props) {
		super(props)
		this.state = true
	}

	setState(newState) {
		this.state = newState || false
		this.emit('set', newState)
	}

	waitForTrue(newState) {
		return new Promise(resolve => {
			let check = () => {
				if (this.state) {
					this.off('set', check)
					resolve()
				}
			}
			this.on('set', check)
			check()
		})
	}
}

const isOpen = new Stater

app.get("/", async (request,response) =>{
    response.setHeader('Content-Type','application/json')
    console.log("Bot Atendimento MS - online")
    await isOpen.waitForTrue()
	isOpen.setState(false)
	isOpen.setState(true)
    return response.send("Bot Atendimento MS - online")

})

app.post("/", (request,response) => {
    if(request.headers['Content-Type'] === 'application/json') return response.status(401).json({
        error: 'Invalid Type',
        message:'Content-Type must be application/json'
    })
    await isOpen.waitForTrue()
	isOpen.setState(false)
	isOpen.setState(true)
    console.log(request.body)
})

app.listen(port, () => console.log(`Bot sendo executado na porta ${port}`))