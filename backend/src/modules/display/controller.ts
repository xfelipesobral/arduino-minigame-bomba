import { v7 as uuid } from 'uuid'
import { generateSmallKey } from './utils/generateSmallKey'

export class DisplayController {
    id: string
    socketId: string
    smallKey: string
    questions: string[]
    lastUpdate: Date

    // Gera uma nova interface a partir do ID do socket
    generateFromSocketId(socketId: string) {
        this.id = uuid()
        this.socketId = socketId
        this.smallKey = generateSmallKey()
        this.questions = []
        this.lastUpdate = new Date()
    }
}