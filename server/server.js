var express = require('express');
var http = require('http');
var socketActions = require('./socketActions');
var bodyParser = require('body-parser');

var project = require('./project');

function Server() {

    this.start = function(door) {
        var server = express();
        var httpServer = http.Server(server);
        var socket = new socketActions(httpServer);

        server.use(express.static(__dirname + '/../client'));
        //server.use(bodyParser.urlencoded({ extended: false }))
        server.use(bodyParser.json());

        new project(server);

        httpServer.listen(door || 8080, function() {
            console.log('Listening at *:8080');
        })
    }
}

module.exports = new Server();