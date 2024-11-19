import serial
import requests

# Define as variaveis iniciais
PORTA = "/dev/cu.usbserial-120"  # Nome da porta em que a placa esta conectada
TAXA_TRANSMISSAO = 9600  # Taxa de transmissao que a placa esta configurada
ID_TELA = "O5JZ"  # Identificador gerado pela interface
API = "http://localhost:3300/"  # Endereco do tunel de comunicacao da API


# Enviar para a API
def enviarParaApi(dados):
    requests.post(API, json={"id": ID_TELA, **dados})


# Enviar conteudo para a API
def enviarComandoParaApi(comando):
    enviarParaApi({"content": comando})


# Enviar perguntas iniciais para a API
def enviarQuestoesParaApi():
    enviarParaApi(
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
def conectarComArduino():
    conectado = False
    while not conectado:
        try:
            ser = serial.Serial(PORTA, TAXA_TRANSMISSAO)
            print(f"Conectado ao Arduino pela porta: {ser.port}")
            conectado = True
            return ser
        except:
            print("Aguardando conexão com o Arduino...")


##################################################################
# Inicia o script

enviarQuestoesParaApi()  # Envia perguntas iniciais para a API
ser = conectarComArduino()  # Conecta ao Arduino

# Le continuamente os dados da porta serial e envia para a API
while True:
    line = str(ser.readline())  # Le linha da porta serial
    if len(line) > 0:  # Quando ter alguma informacao na linha
        print(f"Dados recebidos: {line}")
        enviarComandoParaApi(line)  # Envia conteudo para a API
