interface Params {
    success: boolean
}

export default function Final({ success }: Params) {
    const url = success ? 'fireworks' : 'explosion'

    return (
        <div>
            <video autoPlay muted loop>
                <source src={`/cronometro/assets/videos/${url}.mp4`} type='video/mp4' />
            </video>
        </div>
    )
}