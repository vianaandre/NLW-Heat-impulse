import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { router } from './routes';

const app = express();
const port = 3031;

app.use(cors())
app.use(express.json())
app.use(router);

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {
    console.log(`Usuário conectado no socket.io ${socket.id}`)
})

app.get('/github', (request, response) => {
    response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_KEY_ID}`)
})

app.get('/signin/callback', (request, response) => {
    const { code } = request.query;

    response.json({ code: code })
})

export { io, serverHttp, port }