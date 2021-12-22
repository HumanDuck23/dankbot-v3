/*

    Dank Bot V3
    -=-=-=-=-=-
    Bot for grinding XP, coins and items

    The bot obtains work items as well.
    It moves from job to job after getting
    the item.

 */
const cors = require("cors")
const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

app.use(cors())
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get("/", (req, res) => {
    res.send("Reeee")
})

io.on("connection", (socket) => {
    socket.emit("event", JSON.stringify({
        name: "connected"
    }))
})

server.listen(3000, "0.0.0.0", () => {
    console.log("listening on *:3000")
})