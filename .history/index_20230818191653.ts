import express from "express"

const app = express()

app.get('/', (req, res)=>{
    res.send('Alhamdoullah you are on the route')
})

app.listen(PORT, ()=> {
    console.log('the server listen on port {}')
})