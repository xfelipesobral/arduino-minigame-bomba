const int LED = LED_BUILTIN;

// Intervalo do ciclo (1 segundo)
const int INTERVALO = 1000;

// Senha do desarme
const String AVALIACAO[4] = { "5", "0", "#", "1" };

// Estados
unsigned long ultimoTempo = 0;    // Salva ultimo tempo para calcular o proximo ciclo
int ciclo = 1;                    // Quantidade de ciclos rodados (Max: 60 = 1 minuto)
bool notificouConectado = false;  // Se notificou quando a placa foi conectada
bool notificouStatusFinal = false; // Se notificou quando o status final foi enviado
int situacao = 0;                  // 0 -> Contando, 1 -> Explodiu, 2 -> Desarmado
String mensagem = "";              // Mensagem que sera enviada na serial

// Manipula os ciclos
void manipulaCiclo(unsigned long tempoAtual) {
  bool deuIntervalo = tempoAtual - ultimoTempo >= INTERVALO;
  bool meioIntervalo = tempoAtual - ultimoTempo >= (INTERVALO / 2);

  int estadoLed = digitalRead(LED);

  if (!notificouConectado) {
    Serial.println("conectado");
    notificouConectado = true;
  }

  if (estadoLed) {
    digitalWrite(LED, LOW);
  }

  if (deuIntervalo) {
    mensagem = "ciclo=";
    Serial.println(mensagem + ciclo);
    ciclo += 1;

    digitalWrite(LED, HIGH);

    ultimoTempo = tempoAtual;
  }
}

// Quando a bomba esta armada, roda ciclo
void rodaCiclo() {
  // Conta um novo ciclo
  manipulaCiclo(millis()); // millis() retorna em milisegundos o tempo atual

  // Se clicou em uma tecla
  // if (tecla) {
  //   mensagem = "teclas=";

  //   int indiceCampoVazio = campoVazio();

  //   if (indiceCampoVazio != 4) {
  //     digitado[indiceCampoVazio] = tecla;
  //   }

  //   // Confere o estado
  //   for (int i = 0; i < 4; i++) {
  //     if (digitado[i] != "") {

  //       if (digitado[i] != AVALIACAO[i]) {
  //         situacao = 1;
  //       } else if (i == 3) {
  //         situacao = 2;
  //       }
  //     }

  //     mensagem += digitado[i];
  //   }

  //   mensagem += "=";

  //   digitalWrite(LEDVERDE, HIGH);  // Sinaliza que o evento foi computado
  //   Serial.println(mensagem + situacao);
  // }
}

// Inicializa placa
void setup() {
  pinMode(LED, OUTPUT);

  Serial.begin(9600);
}

// Inicia bomba...
void loop() {
  // Tempo maximo
  if (ciclo > 60) {
    situacao = 1;
  }

  // Checar status
  if (situacao != 0) {
    if (!notificouStatusFinal) {
      notificouStatusFinal = true;
      mensagem = "situacao=";
      Serial.println(mensagem + situacao);

      if (situacao == 2) {
        // Desarmou
      } else {
        // Explodiu
      }
    }
  } else {
    rodaCiclo();
  }
}
