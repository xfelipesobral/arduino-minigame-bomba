interface Params {
    tick: String
    questions: string[]
}

export default function Connected({ tick, questions }: Params) {
    const getMemeImage = () => {
        const t = Number(tick)

        if (t > 50) return 6
        if (t > 40) return 5
        if (t > 30) return 4
        if (t > 20) return 3
        if (t > 10) return 2
        return 1
    }

    return (
        <div className='connected'>
            <img src={`/assets/meme/${getMemeImage()}.webp`} />
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