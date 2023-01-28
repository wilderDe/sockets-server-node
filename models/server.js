const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const cors = require('cors');

const Sockets = require('./sockets');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        

        //http server
        this.server = http.createServer(this.app);

        //Configuracion de socket server
        this.io = socketio(this.server, {/*Configuraciones */});

    }

    middleware(){
        //Desplegar el directorio publico
        this.app.use(express.static(path.resolve(__dirname, '../public')));
        
        //CORs
        this.app.use(cors());
    }

    configurarSockets(){
        new Sockets(this.io);
    }

    execute(){
        //Inicializar middlewares
        this.middleware();

        //Inicializar Sockets
        this.configurarSockets();

        //Inicializar el servidor
        this.server.listen(this.port, ()=>{
            console.log("Server corriendo en el puerto: ", this.port)
        });
    }
}

module.exports = Server;