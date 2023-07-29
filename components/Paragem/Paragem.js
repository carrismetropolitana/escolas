import React from 'react';
import styles from './Paragem.module.css';


function toTitleCase(str) {
    const upperCaseExceptions = ['EB', 'ITS'];
    const lowerCaseExceptions = ['VIA', 'E'];
  
    return str.replace(/\b[\w()çÇãÃáÁàÀõÕúÚéÉíÍóÓ]+/g, function (match) {
      if (upperCaseExceptions.includes(match.toUpperCase())) {
        return match.toUpperCase();
      } 
      else 
      {
        return match.replace(/\w\S*/g, function (innerMatch) {
          if (/^ç/i.test(innerMatch)) {
            return innerMatch.charAt(0).toUpperCase() + innerMatch.substr(1).toLowerCase();
          } else {
            return lowerCaseExceptions.includes(innerMatch.toUpperCase())
              ? innerMatch.toLowerCase()
              : innerMatch.charAt(0).toUpperCase() + innerMatch.substr(1).toLowerCase();
          }
        });
      }
    });
  }
  

const Paragem = ({ paragem }) => {

    return (
        <div key={paragem.id}>
            <div class={styles.stopName}>{toTitleCase(paragem.stop_name)} </div>
            <div>
                <span class={styles.bolhaCinza}>#{paragem.stop_id}</span>
                <span class={styles.bolhaCinza}> {paragem.stop_lat}, {paragem.stop_lon} </span>
            </div>
            <div class={styles.linha}></div>

            { paragem.routes.map((route, route_index) => (

                <div key={ route_index } class={ styles.caixa }>

                    <span class={ styles.numero } style={{ backgroundColor: route.route_color }}>
                        { route.route_short_name }
                    </span>

                    <span class={ styles.routeName }>
                        { toTitleCase(route.route_long_name) }
                    </span>

                </div>
            ))}
        </div>
    );
}
export default Paragem;
