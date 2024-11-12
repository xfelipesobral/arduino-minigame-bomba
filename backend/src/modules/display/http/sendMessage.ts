import { Request, Response } from 'express'

export function httpSendMessageToDisplay(request: Request, response: Response) {
    try {
        // Recebe id e conteudo do corpo da requisicao (o id utilizado é a chave pequena)
        const { id: smallKey, content, questions } = request.body as { id: string, content?: string, questions?: string[] }

        // Verifica se o id foi informado
        if (!smallKey) {
            response.status(400).json({
                mensagem: 'ID da interface é obrigatório!'
            })
            return
        }

        // Busca a interface pela chave
        const display = global.displays.findDisplayBySmallKey(smallKey)

        // Verifica se a interface foi encontrada
        if (!display) {
            response.status(404).json({
                mensagem: 'Interface não encontrada ou não está conectada!'
            })
            return
        }

        // Caso tenha perguntas, atualiza a lista de perguntas
        if (questions) {
            display.questions = questions
            display.lastUpdate = new Date()
        }

        // Envia a mensagem para a interface
        display.sendMessage('default', { content, questions: display.questions })

        response.status(200).json({
            status: 'Mensagem enviada!'
        })
    } catch (e) {
        response.status(500).json({
            mensagem: 'Erro interno no servidor!'
        })
    }
}