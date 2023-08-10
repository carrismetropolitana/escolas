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
      {stop && stop.stop_name ? (

        <div className={styles.stopHeader}>
          <div className={styles.stopName}>{toTitleCase(stop.stop_name)} </div>
          <div>
            <span className={styles.bolhaCinza}>#{stop.stop_id}</span>
            <span className={styles.bolhaCinza}> {stop.stop_lat}, {stop.stop_lon} </span>
          </div>
          <div className={styles.linha}></div>
        </div>
      ) : 'nada'}

      {stop && stop.routes && Array.isArray(stop.routes) ? (
        stop.routes.map((route, route_index) => (

          <div
            key={route_index}
            className={styles.caixa}
          >
            <a
              href={`https://www.carrismetropolitana.pt/horarios/?route_short_name=${route.route_short_name}&date=&route_id=${route.route_id}&stop_id=${stop.stop_id}`}
              target="_blank"
            >
              <span className={styles.numero} style={{ backgroundColor: route.route_color }}>
                {route.route_short_name}
              </span>
            </a>

            <span className={styles.routeName}>
              {toTitleCase(route.route_long_name)}
            </span>

          </div>

        ))
      ) : null}

    </>
  );
}
export default Stop;
