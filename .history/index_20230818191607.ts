import express from "express"

const app = express()

app.get('/', (req, res)=>{
    res.send('alhamdoullah you are on ')
})