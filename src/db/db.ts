import { DB_DATA } from "../static_data/db_datas"

const mongoose  = require('mongoose')
const localDb   = `mongodb://localhost:27017/${DB_DATA.DATATABASE_NAME}`

/// connecting to database  

export const connectToDb = async () => {
    try {
        await mongoose.connect(localDb, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } )
        console.log('connected to db')
    }
    catch (error) {
        console.log(error)
    }
}
