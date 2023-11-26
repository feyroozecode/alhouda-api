import { DB_DATA } from "../static_data/db_datas"

const mongoose  = require('mongoose')
const LOCAL_DB_NAME = `mongodb://localhost:27017/${DB_DATA.DATATABASE_NAME}`
const DATABASE_URL  = process.env.DATABASE_NAME_URL || LOCAL_DB_NAME

/// connecting to database  
export const connectToDb = async () => {
    try {
        await mongoose.connect(
            DATABASE_URL, {
                //useNewUrlParser: true,
                // useUnifiedTopology: true
        } )
        console.log('connected to db')
    }
    catch (error) {
        console.log(error)
    }
}