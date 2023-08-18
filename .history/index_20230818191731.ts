import express from "express"

const PORT = 300 
const app = express();
app.get('/', (req: any, res: any)=>{
    res.send('Alhamdoullah you are on the route')
})

app.listen(PORT, ()=> {
    console.log(`the server listen on port ${PORT}`)
})