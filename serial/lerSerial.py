import serial
import requests

# Define as variaveis iniciais
PORT = "/dev/cu.usbserial-120"  # Nome da porta em que a placa esta conectada
BAUD_RATE = 9600  # Taxa de transmissao que a placa esta configurada
SCREEN_ID = "J0Y6"  # Identificador gerado pela interface
API = "http://localhost:3300/"  # Endereco do tunel de comunicacao da API


# Enviar para a API
def sendToApi(data):
    requests.post(API, json={"id": SCREEN_ID, **data})


# Enviar conteudo para a API
def sendCommandToApi(content):
    sendToApi({"content": content})


# Enviar perguntas iniciais para a API
def sendQuestionsToApi():
    sendToApi(
        {
            "questions": [
                "Quanto é 2 + 2?",
                "Quanto é 3 * 3?",
                "Quanto é 4 / 2?",
                "Quanto é 5 - 1?",
            ]
        }
    )


# Conectar ao Arduino pela porta serial
def connectToArduino():
    connected = False
    while not connected:
        try:
            ser = serial.Serial(PORT, BAUD_RATE)
            print(f"Conectado ao Arduino pela porta: {ser.port}")
            connected = True
            return ser
        except:
            print("Aguardando conexão com o Arduino...")


##################################################################
# Inicia o script

sendQuestionsToApi()  # Envia perguntas iniciais para a API
ser = connectToArduino()  # Conecta ao Arduino

# Le continuamente os dados da porta serial e envia para a API
while True:
    line = str(ser.readline())  # Le linha da porta serial
    if len(line) > 0:  # Quando ter alguma informacao na linha
        print(f"Dados recebidos: {line}")
        sendCommandToApi(line)  # Envia conteudo para a API
