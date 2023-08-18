const express = require("express");


const PORT = 3000 ;

const app = express();
app.get('/', (req, res: app.)=>{
    res.send('Alhamdoullah you are on the route')
})

app.listen(PORT, ()=> {
    console.log(`the server listen on port ${PORT}`)
})