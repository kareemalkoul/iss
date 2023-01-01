import express from "express";
import {Server} from "socket.io";

const session = require('express-session');
import {createServer} from "http";
const app = express();

const httpServer = require('http').createServer(app);


const io = new Server(httpServer, {
    /* options */
    cors: {origin: "*"}
});

export class Socekt {


}