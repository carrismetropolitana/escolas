import Image from 'next/image';
import BlackHeader from '../BlackHeader/BlackHeader'

const Pass = () => {

    return (
        <div>
            <BlackHeader
                text='Passe navegante'
            />

            <a
                href="https://www.carrismetropolitana.pt/cartoes/"
                target="_blank"
            >
                <Image
                    priority
                    src="/images/PasseNavegante.png"
                    alt="Passe navegante"
                    layout="responsive"
                    width={100}
                    height={100} // This value doesn't really matter for the 'responsive' layout

                    styles={{ padding: '5px' }}
                />
            </a>
        </div>
    );
}

export default Pass;