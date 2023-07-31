import React from 'react';
import styles from './Stop.module.css';


function toTitleCase(str) {
    const upperCaseExceptions = ['EB', 'ITS', 'EN'];
    const lowerCaseExceptions = ['VIA', 'E', 'DE', 'DA', 'DO'];
  
    
    return str.replace(/\b[\w()çÇãÃáÁàÀéÉíÍóÓõÕúÚ]+/g, function (match) {
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
  

const Stop = ({ stop }) => {

    return (
        <div key={stop.id}>
            <div class={styles.stopName}>{toTitleCase(stop.stop_name)} </div>
            <div>
                <span class={styles.bolhaCinza}>#{stop.stop_id}</span>
                <span class={styles.bolhaCinza}> {stop.stop_lat}, {stop.stop_lon} </span>
            </div>
            <div class={styles.linha}></div>

            { stop.routes.map((route, route_index) => (

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
export default Stop;
