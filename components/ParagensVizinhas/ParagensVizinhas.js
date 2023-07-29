import React from 'react';
import Paragem from '../Paragem/Paragem';
import styles from './ParagensVizinhas.module.css';

function toTitleCase(str) {
    return str.replace(/\b\w+/g, function (match) {
        return match.charAt(0).toUpperCase() + match.substr(1).toLowerCase();
    });
}


const ParagensVizinhas = ({ escola, paragens }) => {
    
    if (!paragens || paragens.length === 0) {
        return <p>Sem paragens.</p>;
    }

    return (
        <div className={styles.container} >
            
            <div  className={styles.nomeParagem}>Paragens que servem a instituição de ensino: {escola.name}</div>
            <div>
                {paragens.map((paragem, index) => (            
                    <Paragem paragem={paragem} />
                ))}
            </div>
        </div>
    );
};

export default ParagensVizinhas;
