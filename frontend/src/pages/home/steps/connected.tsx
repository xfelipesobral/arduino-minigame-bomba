interface Params {
    tick: String
    questions: string[]
}

export default function Connected({ tick, questions }: Params) {
    const getMemeImage = () => {
        const p = (Number(tick) / 60) * 100

        if (p > 80) return 3
        if (p > 40) return 2
        return 1
    }

    return (
        <div className='connected'>
            <img src={`/assets/meme/${getMemeImage()}.png`} />
            <h1>{tick.padStart(2, '0')}</h1>

            <div className='list'>
                <ol>
                    {
                        questions.map((question, index) => <li key={index}>{question}</li>)
                    }
                </ol>
            </div>
        </div>
    )
}