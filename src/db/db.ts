const mongoose = require('mongoose')
const localDb = 'mongodb://localhost:27017/alhouda_db'

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
