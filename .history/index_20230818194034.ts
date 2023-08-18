const express = require("express");
const request = require('express').Request;
const response = require('express').Response;

const PORT = 3000 ;

const app = express();
app.get('/', (req: Request, res: Response)=>{
    res.send('Alhamdoullah you are on the route')
})

app.listen(PORT, ()=> {
    console.log(`the server listen on port ${PORT}`)
})