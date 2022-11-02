// const server = require('http').createServer();
// const io = require('socket.io')(server, {
//     cors: {
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST"]
//     }
// });

// io.on('connection', (socket) => {
//     socket.on('play', index => {
//         console.log("server recieved", index);
//         socket.broadcast.emit('play', index);
//     })
// })
// io.use(function (socket, next) {

//     console.log("ruuuuuuuuuuuuuu");
//     if (socket.handshake.query && socket.handshake.query.token) {
//         jwt.verify(socket.handshake.query.token, 'JWT_SECRET', function (err, decoded) {
//             if (err) return next(new Error('Authentication error'));
//             socket.decoded = decoded;
//             next();
//         });
//     }
//     else {
//         next(new Error('Authentication error'));
//     }
// })
//     .on('connection', function (socket) {
//         // Connection now authenticated to receive further events

//         console.log("User Connected");

//         socket.on("joinRoom", (roomCode) => {
//             console.log(`A user joined the room ${roomCode}`);
//             socket.join(roomCode);
//         });

//         socket.on("play", ({ id, roomCode }) => {
//             console.log(`play at ${id} to ${roomCode}`);
//             socket.broadcast.to(roomCode).emit("updateGame", id);
//         });

//         socket.on("disconnect", () => {
//             console.log("User Disconnected");
//         });
//     });



const express = require('express');
const app = express();
const cors = require("cors");
var path = require('path');
var createError = require('http-errors');
const cookieParser = require('cookie-parser');
const authorization = require("./middleware/authorization");

var indexRouter = require('./routes/index');
var gameRouter = require('./routes/game');

app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.use('/', indexRouter.router);
app.use('/game', authorization, gameRouter.router);

app.listen(5000, () => {
    console.log("running");
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    // res.status(err.status || 500);
    // res.render('error');
    res.json({ error: err })
});


module.exports = app;