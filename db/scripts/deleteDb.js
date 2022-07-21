import { openDb } from '../configDb.js'

const initDb = {
    async init(){
        const db = await openDb()
        await db.exec(`DROP TABLE protocols`)
        await db.close()
    }
}

initDb.init()