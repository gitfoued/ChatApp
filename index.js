import express from "express";
import morgan from "morgan";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

app.use(morgan("dev"))
app.use(express.static('public'));
//setup socket
const io = new Server(server);
//verifie cnx
io.on('connection', (socket) => {
    console.log("made socket connection", socket.id);
    // Handle chat event
    socket.on('chat', function(data){
         //console.log(data)
        io.sockets.emit('chat', data);
      
    });

});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
