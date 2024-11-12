import serial
import requests

# Define as variaveis iniciais
PORTA = "/dev/cu.usbmodem11201"  # Nome da porta em que a placa esta conectada
TAXA_TRANSMISSAO = 9600  # Taxa de transmissao que a placa esta configurada
ID_TELA = "773d0789-7546-4708-8e7c-035c47a12542"  # Identificador gerado pela interface
ENDERECO_SOCKET = (
    "http://localhost:3300/tunel"  # Endereco do tunel de comunicacao da API
)


# Enviar para a API
def comunicaApi(dados):
    requests.post(ENDERECO_SOCKET, json={"id": ID_TELA, **dados})


# Enviar conteudo para a API
def enviarConteudoParaApi(conteudo):
    comunicaApi({"conteudo": conteudo})


# Enviar perguntas iniciais para a API
def enviarPerguntasParaApi():
    comunicaApi(
        {
            "perguntas": [
                "Quanto é 2 + 2?",
                "Quanto é 3 * 3?",
                "Quanto é 4 / 2?",
                "Quanto é 5 - 1?",
            ]
        }
    )


# Conectar ao Arduino pela porta serial
def conectarArduino():
    conectado = False
    while not conectado:
        try:
            ser = serial.Serial(PORTA, TAXA_TRANSMISSAO)
            print("Conectado ao Arduino pela porta: {ser.name}")
            conectado = True
            return ser
        except:
            print("Aguardando conexão com o Arduino...")


##################################################################
# Inicia o script

enviarPerguntasParaApi()  # Envia perguntas iniciais para a API
ser = conectarArduino()  # Conecta ao Arduino

# Le continuamente os dados da porta serial e envia para a API
while True:
    linha = str(ser.readline())  # Le linha da porta serial
    if len(linha) > 0:  # Quando ter alguma informacao na linha
        print("Dados recebidos: {linha}")
        enviarConteudoParaApi(linha)  # Envia conteudo para a API
