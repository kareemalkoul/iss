import "express-async-errors";
import express from "express";
import {Config} from "./utils/config";
import "./repo/database";
import {apiRouter} from "./routes/api";
import CustomError from "./utils/errors/customeError";
import {customInterceptor} from "./middleware/interceptor";
import morgan from "morgan";
import bcrypt from "bcrypt";

const session = require('express-session');

// import {createServer} from "http";
const app = express();
const httpServer = require('http').createServer(app);

import {Server} from "socket.io";
import {User} from "./models/user.model";

app.use(express.static(__dirname + "/../pages"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(customInterceptor);
app.use(morgan("dev"));
app.use("/api", apiRouter);

app.use(CustomError.errorMiddleware);


const io = new Server(httpServer, {
    /* options */
    cors: {origin: "*"}
});

var sessionMiddleware = session({
    secret: "keyboard cat"
});

io.use(function (socket, next) {
    sessionMiddleware(socket.request, socket.request, next);
});

io.on("connection", (socket) => {
    var req = socket.request;
    socket.on('Login', async (data) => {
        let user = await checkLogin(data);
        console.log('Done');
        console.log(user)
        // @ts-ignore
        if (user) {
            console.log("user exists");
            io.sockets.emit("Valid", "Tokendhsjkcl,z;x./");
        } else {
            console.log("user does not exists");
            io.sockets.emit('invalid', "Invalid Credentials");
        }
    });

    socket.on('RegisterNewUser', async (data: any) => {
        let user = await newUser(data);

        console.log(user)
        io.sockets.emit('user_logged', data);
    });

    socket.on('disconnect', (socket) => {
        console.log("Disconnect");
    });
});


httpServer.listen(8000, () => {
    console.log("Socket is running on port : " + 8000);
});

const server = app.listen(Config.server.Port);

export {server};


async function checkLogin(data: any) {
    const userChecked = await User.findOne({
        where: {
            phone: data.phone,
        }
    });
    console.log(userChecked)
    return userChecked;
}

async function newUser(data: any) {
    const user = await User.create({
        user_name: data.username,
        phone: data.phone,
        password: bcrypt.hashSync(data.password, Config.bcryptConfig.saltKey),
    });
    console.log(user)
    return user;
}