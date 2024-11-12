import { Server } from 'socket.io'
import { DisplayRepositoryService } from '../modules/displayRepository'

declare global {
    var displays: DisplayRepositoryService
    var socketIo: Server
}