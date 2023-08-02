import React from 'react';
import Stop from '../Stop/Stop';
import styles from './Stops.module.css';
import BlackHeader from '../BlackHeader/BlackHeader'

function toTitleCase(str) {
    return str.replace(/\b\w+/g, function (match) {
        return match.charAt(0).toUpperCase() + match.substr(1).toLowerCase();
    });
}


const Stops = ({ school, stops }) => {
    
    if (!stops || stops.length === 0) {
        return <p>Sem paragens.</p>;
    }

    return (
        <div className={styles.container} >
            
            <BlackHeader 
            text={`Paragens que servem: ${school.name}`}
            />
            <div>
                {stops.map((stop, index) => (            
                    <Stop key={index} stop={stop} />
                ))}
            </div>
        </div>
    );
};

export default Stops;
