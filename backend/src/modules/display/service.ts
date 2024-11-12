import { DisplayController } from './controller'

export class Display extends DisplayController {
    // Envia uma mensagem para o display
    sendMessage(subject: string, content: object) {
        global.socketIo.to(this.socketId).emit(subject, content)
    }

    // Envia uma mensagem de conexão para o display
    sendConnectedMessage() {
        this.sendMessage('connected', {
            id: this.id,
            smallKey: this.smallKey,
            questions: this.questions,
            lastUpdate: this.lastUpdate
        })
    }
}