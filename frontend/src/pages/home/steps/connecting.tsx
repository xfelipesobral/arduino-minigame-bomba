import Lottie from 'react-lottie'

import searchingAnimation from '../../../lottie/18809-radar-animation-for-maps.json'

interface Params {
    id: string
}

export default function Connecting({ id }: Params) {

    return (
        <div className='conectando'>
            <Lottie
                options={{
                    loop: true,
                    autoplay: true,
                    animationData: searchingAnimation
                }}
                height={200}
                width={200}
            />
            <div className='informations'>
                {
                    id ? <>
                        <h1>Procurando Dispositivo</h1>
                        <p>{id}</p>
                    </> : <h1>Configurando Sistema</h1>
                }
            </div>
        </div>
    )
}