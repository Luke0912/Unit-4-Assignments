const app = require("./index")

const connect = require("./configs/db")

app.listen(5700, async ()=>{
    await connect()
    console.log("listening on the port 5700")
})