const express = require("express");
import { connectToDb } from './db/db'

const PORT = 3000 ;

const app = express();
app.use(express.json());
connectToDb();
app.get('/', function (req: any, res: any) {
        res.send('Alhamdoullah all is working fine !');
})

const server = app.listen(PORT, () => {
    console.log(`the server listen on port ${PORT}`)
})

process.on('uncaughtException', (err: any, origin: any) => {
   console.log(`Caught exception: ${err}\n` + `Exception origin: ${origin}` );
   server.close();
})