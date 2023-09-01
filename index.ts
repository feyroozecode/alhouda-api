const express             =     require("express");
const routes              =     require('./src/routes/index')
const cookieParser        =     require("cookie-parser");
import   { connectToDb }  from  './src/db/db'
import   {    API      }  from  './src/static_data/api_routes';

const PORT    = 3000 ;
const app     = express();

connectToDb();
app.use(express.json());
// use cookie parser for the cookie 
app.use(cookieParser());

app.use(API.API_V1_BASE_ROUTE, routes)

const server = app.listen(PORT, () => {
    console.log(`the server listen on port ${PORT}`)
})
process.on('uncaughtException', (err: any, origin: any) => {
   console.log(`Caught exception: ${err}\n` + `Exception origin: ${origin}` );
   server.close();
})