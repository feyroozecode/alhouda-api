import express from "express"

const app = express();

app.get('/', (req: any, res:)=>{
    res.send('Alhamdoullah you are on the route')
})

app.listen(PORT, ()=> {
    console.log(`the server listen on port ${PORT}`)
})