const express                    =     require("express");
const routes                     =     require('./src/routes/index')
const cookieParser               =     require("cookie-parser");
import   { connectToDb }         from  './src/db/db'
import   {    API      }         from  './src/static_data/api_routes';
import   { adminAuth, userAuth } from './src/middleware/auth.middleware'

const PORT    = 3000 ;
const app     = express();

connectToDb();
app.use(express.json());
// use cookie parser for the cookie 
app.use(cookieParser());

//using admin 
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