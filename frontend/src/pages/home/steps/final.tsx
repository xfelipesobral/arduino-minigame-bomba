interface Params {
    url: string
}

export default function Final({ url }: Params) {

    return (
        <div>
            <video autoPlay muted loop>
                <source src={`/assets/videos/${url}.mp4`} type='video/mp4' />
            </video>
        </div>
    )
}