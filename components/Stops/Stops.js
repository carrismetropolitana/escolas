import React from 'react';
import Stop from '../Stop/Stop';
import styles from './Stops.module.css';
import BlackHeader from '../BlackHeader/BlackHeader'


const Stops = ({ school, stops }) => {

    if (!stops || stops.length === 0) {
        return <p></p>;
    }

    return (
        <>
            {/* <div className={styles.container} > */}

            <BlackHeader
                text={`Paragens que servem a instituição: ${school.name}`}
            />

            <div className={styles.listOfStops}>
                {stops.map((stop, index) => (
                    <Stop
                        key={index}
                        stop={stop}
                        isMap={false}
                    />
                ))}
            </div>

        </>
    );
};

export default Stops;
