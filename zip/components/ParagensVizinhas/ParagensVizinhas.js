import React from 'react';
import styles from './ParagensVizinhas.module.css';

const ParagensVizinhas = ({ paragens, escola }) => {
    function toTitleCase(str) {
        return str.replace(/\b\w+/g, function (match) {
            return match.charAt(0).toUpperCase() + match.substr(1).toLowerCase();
        });
    }

    if (!paragens || paragens.length === 0) {
        return <p>Sem paragens.</p>;
    }

    return (
        <div className={styles.container} style={{ textAlign:'left', marginTop: '40px'}}>
            Paragens e linhas que servem a {escola}
            <div style={{ border: '1px solid black', padding:'20px', borderRadius:'20px'}}>
                {paragens.map((paragem, index) => (
                    <div key={index}>
                        <div style={{ fontWeight: 'bold', marginBottom: '30px' }}>{toTitleCase(paragem.stop_name)} ({paragem.stop_id})
                            {paragem.routes.map((route, route_index) => (

                                <div key={route_index} style={{ backgroundColor: 'whitesmoke', borderRadius: '20px', margin: '10px', padding: '0', display: 'flex', justifyContent: 'flex-start' }}>

                                    <span style={{ fontWeight: 'bold', backgroundColor: route.route_color, borderRadius: '20px', padding: '2px 10px' }}>
                                        {route.route_short_name}
                                    </span>

                                    <span style={{ fontWeight: 'normal', paddingLeft: '10px' }}>
                                        {toTitleCase(route.route_long_name)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ParagensVizinhas;
