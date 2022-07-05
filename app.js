const express = require('express')
const app = express()
const { EventEmitter } = require('events')
const bodyParser = require('body-parser')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

///////////////
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

app.get('/', async (req, res) => {
	res.setHeader('Content-Type', 'application/json')
	await isOpen.waitForTrue()
	isOpen.setState(false)
	fs.createReadStream(dbPath).pipe(res)
	isOpen.setState(true)
})

app.post('/', async (req, res) => {
	if (req.headers['Content-Type'] === 'application/json') return res.status(401).json({
		error: 'Invalid Type',
		message: 'Content-Type must be application/json'
	})
  console.log(req.body)
  const chatProtocol = req.body.protocol
  const chatType = req.body.type
  const chatMessage = req.body.message
  
  await isOpen.waitForTrue()
	isOpen.setState(false)
	fs.createReadStream(dbPath).pipe(res)
	isOpen.setState(true)
})

app.listen(process.env.PORT || 3000)