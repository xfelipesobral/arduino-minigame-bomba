import { Router, Request, Response } from 'express'

import { httpSendMessageToDisplay } from '../modules/display/http/sendMessage'

const router = Router()

// Rota principal
router.route('/')
    // GET: Retorna uma mensagem de status
    .get((request: Request, response: Response) => {
        response.json({
            status: 'API funcionando! 🚀',
        })
    })
    // POST: Envia uma mensagem para a interface conectada
    .post(httpSendMessageToDisplay)

export default router