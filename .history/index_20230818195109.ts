const express = require("express");


const PORT = 3000 ;

const app = express();
app.get('/', function (req: any, res: any) {
        res.send('<body style="background-color:#cc">Alhamdoullah you are on the route</body>');
})

app.listen(PORT, () => {
    console.log(`the server listen on port ${PORT}`)
})