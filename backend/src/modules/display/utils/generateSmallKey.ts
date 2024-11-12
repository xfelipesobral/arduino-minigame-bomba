export function generateSmallKey(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' // Define os caracteres que podem ser usados na chave

    let key = ''

    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length) // Gera um indice aleatorio com base no tamanho da string de caracteres
        key += characters[randomIndex] // Adiciona o caractere correspondente ao indice gerado na chave
    }

    return key // Retorna a chave gerada
}