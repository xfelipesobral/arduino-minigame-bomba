# Executando o projeto

---

## 1. Baixar e Instalar o Arduino IDE

O Arduino IDE é a ferramenta que utilizaremos para programar e carregar código nos dispositivos Arduino.

1. Acesse o site oficial do Arduino:  
   [https://www.arduino.cc/en/software](https://www.arduino.cc/en/software)
2. Escolha a versão do Arduino IDE compatível com o seu sistema operacional (Windows, macOS ou Linux).
3. Baixe o instalador e siga as instruções de instalação.
4. Após a instalação, abra o Arduino IDE para confirmar que está funcionando corretamente.

---

## 2. Baixar a Biblioteca `Keypad.h`

A biblioteca **Keypad.h** é necessária para trabalhar com teclados matriciais no Arduino.

1. Abra o Arduino IDE.
2. Vá para o menu **Sketch** > **Include Library** > **Manage Libraries...**.
3. Na barra de busca, digite `Keypad`.
4. Localize a biblioteca **Keypad** desenvolvida por **Mark Stanley, Alexander Brevig** e clique em **Install**.

---

## 3. Baixar e Instalar o Python

O Python será usado para interagir com o Arduino via scripts.

1. Acesse o site oficial do Python:  
   [https://www.python.org/downloads/](https://www.python.org/downloads/)
2. Faça o download da versão **3.13.0** (ou superior).
3. Durante a instalação:
    - Certifique-se de marcar a opção **Add Python to PATH**.
    - Conclua a instalação seguindo as instruções.
4. Para verificar se o Python está instalado corretamente, abra o terminal (ou prompt de comando) e execute:
    ```bash
    python --version
    ```
    Isso deve retornar algo como Python (versão instalada).

## 4. Instalar a Biblioteca pyserial

A biblioteca pyserial é usada para comunicação serial entre o Python e o Arduino.

1. No terminal (ou prompt de comando), execute:
    ```bash
    pip install pyserial
    ```

## 5. Instalar a Biblioteca requests

A biblioteca requests é utilizada para fazer requisições HTTP em Python.

1. No terminal (ou prompt de comando), execute:
    ```bash
    pip install pyserial
    ```
