import  {google} from 'googleapis'
import fs from 'fs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));
const credentials  = JSON.parse(fs.readFileSync(__dirname + '/credentials.json'))

const client = new google.auth.JWT(
    credentials.client_email, 
    null, 
    credentials.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
)

export async function requestGs(){
    client.authorize()
    console.log('Conectado!')
    const resultado = await gsrun(client)
    return resultado
}

async function gsrun(client){
    const gsapi = google.sheets({version: 'v4',auth: client})
    const opt = {
        spreadsheetId:'12HnALf4z03lepUk05vG9PWplJSIsDkbr-JqXsnSQIho',
        range: 'index!E:F',
        majorDimension: 'ROWS'
    }

    let array = []
    let data = await gsapi.spreadsheets.values.get(opt)
    const rows = data.data.values
    const lengthRow = rows[0].length
    if (lengthRow) {
            rows.map((row) =>{
                for(var i=0; i < lengthRow; i++ ){
                    array.push(row[i])
                }
            })
            return array
        }
}