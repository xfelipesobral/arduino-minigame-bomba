import { Display } from '../display'

export class DisplayRepositoryController {
    list: Display[] = []

    // Cria um novo display a partir do ID do socket
    newDisplay(socketId: string): Display {
        const display = new Display()

        display.generateFromSocketId(socketId)

        this.list.push(display)

        return display
    }

    // Busca uma interface pelo ID do socket
    findDisplayBySocketId(socketId: string): Display | undefined {
        return this.list.find(screen => screen.socketId === socketId)
    }

    // Busca uma interface pelo ID
    findDisplayById(id: string): Display | undefined {
        return this.list.find(screen => screen.id === id)
    }

    // Busca uma interface pela chave pequena
    findDisplayBySmallKey(smallKey: string): Display | undefined {
        return this.list.find(screen => screen.smallKey === smallKey)
    }
}