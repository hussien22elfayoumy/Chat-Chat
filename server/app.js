import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';

const app = express();

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`User connected Successfully: ${socket.id}`);
});

server.listen(8080, () => {
  console.log('Server is running on port 8080');
});
