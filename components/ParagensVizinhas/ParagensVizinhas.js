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
        <div  
            className={styles.container} 
            style={{ textAlign:'left', marginTop: '40px'}}
        >
            Linhas que servem a {escola}:
            <div style={{ height:'400px', width:'100%', 
            border: '1px solid black', padding:'20px',  borderRadius:'20px', background:'white', 
            display:'flex', flexDirection:'column', gap:'10px', flexWrap: 'wrap', alignitems:'flex-start'}}>
                {paragens.map((paragem, index) => (
                    <div key={index} style={{width: 'calc(50% - 5px)' }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>{paragem.stop_name} 
                        <br></br>
                        <span class={styles.bolhaCinza}>#{paragem.stop_id}</span>                        
                        <span class={styles.bolhaCinza}> {paragem.stop_lat}, {paragem.stop_lon} </span>
                        
                        <div style={{ height:'0', marginTop:'5px', borderBottom: '1px solid lightgrey', }}></div>

                            {paragem.routes.map((route, route_index) => (

                                <div key={route_index} style={{ 
                                    // backgroundColor: 'white', 
                                    borderRadius: '20px', margin: '5px 0', padding: '0', display: 'flex', justifyContent: 'flex-start', alignItems:'flex-start'}}>

                                    <span style={{ fontWeight: 'bold', backgroundColor: route.route_color, borderRadius: '20px', padding: '0 8px', width: '6.2ch', color:'white'}}>
                                        {route.route_short_name}
                                    </span>

                                    <span style={{ fontWeight: 'normal', paddingLeft: '5px' }}>
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
