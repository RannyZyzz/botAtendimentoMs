import { openDb } from '../db/configDb.js'

export async function createTable(){

    const db = await openDb()

    await db.exec(`DROP TABLE IF EXISTS protocols`)

    await db.exec(`CREATE TABLE IF NOT EXISTS protocols
                    (
                        protocol TEXT,
                        name TEXT,
                        email TEXT,
                        celphone TEXT
                    )`)
    
    await db.exec(`INSERT INTO protocols
                    (protocol, name, email, celphone)
                    VALUES
                    ('99999920220720000003:0','rannier','rannier@mobilesaude.com.br','(48)98413-7055')`)

    await db.close()
}

export async function insertProtocol(req, res) {

    const protocol = req.body.protocol
    const name = req.body.user.name
    const email = req.body.user.email
    const celphone = req.body.user.phone

    const db = await openDb()

    await db.exec(`INSERT INTO protocols
                (protocol, name, email, celphone)
                VALUES
                ('${protocol}','${name}','${email}','${celphone}')`)

}

export async function searchDataProtocol(req, res){

    const protocol = req

    const db = await openDb()

    const result = await db.all(`SELECT email FROM protocols WHERE protocol = '${protocol}'`)

    return result
}