import React from 'react';
import styles from './Stop.module.css';


function toTitleCase(str) {
  const upperCaseExceptions = ['EB', 'ITS', 'EN'];
  const lowerCaseExceptions = ['VIA', 'E', 'DE', 'DA', 'DO'];


  return str.replace(/\b[\w()çÇãÃáÁàÀéÉêÊíÍóÓõÕúÚ]+/g, function (match) {
    if (upperCaseExceptions.includes(match.toUpperCase())) {
      return match.toUpperCase();
    }
    else {
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
    <>
      <div className={styles.stopHeader}>
        <div className={styles.stopName}>{toTitleCase(stop.stop_name)} </div>
        <div>
          <span className={styles.bolhaCinza}>#{stop.stop_id}</span>
          <span className={styles.bolhaCinza}> {stop.stop_lat}, {stop.stop_lon} </span>
        </div>
        <div className={styles.linha}></div>
      </div>

      {stop.routes.map((route, route_index) => (

        <div key={route_index} className={styles.caixa}>

          <span className={styles.numero} style={{ backgroundColor: route.route_color }}>
            {route.route_short_name}
          </span>

          <span className={styles.routeName}>
            {toTitleCase(route.route_long_name)}
          </span>

        </div>
      ))}
    </>
  );
}
export default Stop;
