const { Socket } = require('dgram')
const express = require('express')
const app = express()
const http = require("http").createServer(app)
const port = process.env.PORT || 3000
const io = require('socket.io')(http)
const words = require('./database')

io.on("connection", (socket) => {
  console.log("user conected")

  socket.on('setMsg', (data) => {
    console.log(data)
    socket.broadcast.emit('fetchMessage', data)
  })
})

http.listen(port, () => {
  console.log("Listening port in " + port)
})