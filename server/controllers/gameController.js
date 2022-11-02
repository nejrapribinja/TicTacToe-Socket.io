const router = require("express").Router();
const game = require("../controllers/gameController");
const { pool } = require('../db');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();

var io = null;

exports.joinRoom = async(req,res,next) => {
    const room = req.params;
    console.log(room)
    if(!io) {
        io = require("socket.io")(req.connection.server, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"]
            }
        });
    
        io.on('connection', function (socket) {
            // Connection now authenticated to receive further events
    
            console.log("User Connected");
    
            socket.on("joinRoom", (roomCode) => {
                console.log(`A user joined the room ${roomCode}`);
                socket.join(roomCode);
            });
    
            socket.on("play", ({ id, roomCode }) => {
                console.log(`play at ${id} to ${roomCode}`);
                socket.broadcast.to(roomCode).emit("updateGame", id);
            });
    
            socket.on("disconnect", () => {
                console.log("User Disconnected");
            });
        });
    }
    res.sendStatus(200);
}
