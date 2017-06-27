var socketIO = require('socket.io');

function socketActions(httpServer) {

    var io = socketIO(httpServer);

    io.on('connection', function (socket) {
        socket.on('text changed', function (data) {
            io.emit('text changed', data.text);
        })

        socket.on('disconnect', function () {
            console.log('a user disconnected');
        })
    });

}

module.exports = socketActions;