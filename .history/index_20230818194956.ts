const express = require("express");


const PORT = 3000 ;

const app = express();
app.get('/', function (req: any, res: any) {
        res.send('<body style="color:">Alhamdoullah you are on the route</b>');
})

app.listen(PORT, () => {
    console.log(`the server listen on port ${PORT}`)
})