import Image from 'next/image';
import BlackHeader from '../BlackHeader/BlackHeader'


const Planner = () => {

    return (
        <div>
            <BlackHeader
                text='Planeador de Viagem'
            />

            <a href="https://www.carrismetropolitana.pt/planeador/" target="_blank">
                <Image
                    priority
                    src="/images/planner.png"
                    alt="Planeador de viagem"
                    layout="responsive"
                    width={100}
                    height={100} // This value doesn't really matter for the 'responsive' layout

                    styles={{ padding: '5px' }}
                />
            </a>
        </div>
    );
}

export default Planner;