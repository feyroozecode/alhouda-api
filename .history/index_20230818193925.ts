const express = require("express");
const Request = require('express').Request;


const PORT = 3000 ;

const app = express();
app.get('/', (req: any, res: any)=>{
    res.send('Alhamdoullah you are on the route')
})

app.listen(PORT, ()=> {
    console.log(`the server listen on port ${PORT}`)
})