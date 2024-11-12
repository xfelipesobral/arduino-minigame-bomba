import express from 'express'
import bodyParser from 'body-parser'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { configDotenv } from 'dotenv'

import { displays as displayRepository } from './src/modules/displayRepository'

import routes from './src/routes'

configDotenv() // Configura o dotenv

const PORT = process.env.PORT || '3300' // Define a porta do servidor

const app = express() // Inicializa o express

app.use(bodyParser.json({ limit: '1mb' })) // Configura o body-parser para aceitar JSON com até 1MB

const httpServer = createServer(app) // Cria o servidor HTTP

// Configura o socket.io
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
})

global.displays = displayRepository // Inicializa o array de interfaces
global.socketIo = io // Adiciona o socketIo ao objeto global

app.use(routes) // Adiciona as rotas ao servidor

io.on('connection', (socket) => {
    const displayId = (socket.handshake.query.id || '') as string // id do display que se conectou
    let display = global.displays.findDisplayById(displayId) // Busca se a interface ja foi adicionada

    // Se nao foi adicionada, cria uma nova
    if (!display) {
        display = global.displays.newDisplay(socket.id)
    }

    display.socketId = socket.id // Atualiza o id do socket

    display.sendConnectedMessage() // Envia a mensagem de conexão para a interface

    console.log(`💻 Interface conectada: ${display.id} - 🔑 ${display.smallKey}`)
})

// Inicia o servidor
httpServer.listen(PORT, () => {
    console.log(`🟢 Servidor rodando na porta ${PORT}`)
})