import { useState, useEffect, useRef } from 'react'

import { io } from 'socket.io-client'

import { storageGetDisplayId, storageSetDisplayId } from '../../functions/storage'

import Connecting from './steps/Connecting'
import Connected from './steps/Connected'
import Final from './steps/final'

import './home.css'

const API_URL = 'http://localhost:3300'

export default function Home() {
	const [step, setStep] = useState<'connecting' | 'connected' | 'final'>('connecting') // Etapa do jogo)
	const [tick, setTick] = useState('1') // Tempo da bomba
	const [status, setStatus] = useState('1') // Status da bomba
	const [questions, setQuestions] = useState<string[]>([]) // Perguntas
	const [id, setId] = useState('') // ID do display

	const debounceInitialSocket = useRef<number>() // Debounce para inicializacao do socket

	useEffect(() => {
		initSocket() // Inicia comunicacao com o socket ao montar o componente
	}, [])

	// Inicia comunicacao com o socket
	const initSocket = () => {
		window.clearTimeout(debounceInitialSocket.current)

		// Debounce para evitar chamadas desnecessarias
		debounceInitialSocket.current = window.setTimeout(() => {
			socket()
		}, 100)
	}

	// Monta a comunicacao com a api via socket
	const socket = () => {
		const id = storageGetDisplayId() || ''

		const socket = io(API_URL, { query: { id } })

		socket.on('connected', ({ id, smallKey }: Display) => {
			storageSetDisplayId(id)
			setId(smallKey)
		})

		socket.on('default', ({ content, questions }: { content?: string, questions?: string[] }) => {
			if (questions) {
				setQuestions(questions)
			}

			if (content) {
				translateContent(content.replace(/(\r\n|\n|\r|b'|')/g, '').replace(/(?:\\[rn])+/g, ''))
			}
		})
	}

	// Traduz a mensagem recebida do socket
	const translateContent = (content: string) => {
		if (content === 'conectado') {
			setStep('connected')
			setTick('1')
			return
		}

		if (content.match('ciclo')) {
			const [_, ciclo] = content.split('=')
			setTick(ciclo)
			return
		}

		if (content.match('situacao')) {
			const [_, situacao] = content.split('=')
			setStatus(situacao)
			setStep('final')
			return
		}
	}

	return (
		<div className='home'>
			<div className='content'>
				{
					{
						'connecting': <Connecting id={id} />,
						'connected': <Connected tick={tick} questions={questions} />,
						'final': <Final url={status === '1' ? 'bomba' : 'fogos'} />
					}[step]
				}
			</div>
			<footer>
				<p>UFPR Palotina - Licenciatura em Computação - <a href='https://github.com/xfelipesobral/arduino-bomba' target='_BLANK' rel="noreferrer">Github</a></p>
			</footer>
		</div>
	)
}