const express                    =     require("express");
const routes                     =     require('./src/routes/index')
const cookieParser               =     require("cookie-parser");
import cors                      =     require('cors')
import   { connectToDb }         from  './src/db/db'
import   {    API      }         from  './src/static_data/api_routes';
import   { adminAuth, userAuth } from  './src/middleware/auth.middleware'
import       dotenv              from  'dotenv';
import { loggerMiddleware } from './src/middleware/logger.middleware'
import    errorHandler      from './src/lib/error.handler'

const PORT    = process.env.PORT || 3033  ;
const app     = express();

// configure 
dotenv.config()
connectToDb();
app.use(express.json());
// use cookie parser for the cookie 
app.use(cookieParser());
app.use(cors())
app.use(loggerMiddleware)
app.use(errorHandler)

//using admin routes 
app.get(`${API.API_V1_BASE_ROUTE}/admin`, adminAuth, (req: any, res: any) => { res.send('Admin Auth') })
app.get('/basic',  (req: any, res: any) => { res.send('Admin Auth') })

app.use(API.API_V1_BASE_ROUTE, routes)

const server = app.listen(PORT, () => {
    console.log(`the server listen on port ${PORT}`)
})
process.on('uncaughtException', (err: any, origin: any) => {
   console.log(`Caught exception: ${err}\n` + `Exception origin: ${origin}` );
   server.close();
})