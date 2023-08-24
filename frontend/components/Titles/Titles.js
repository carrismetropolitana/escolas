import styles from './Titles.module.css';

const Titles = ({ municipality, school, setSchool }) => {
  return (
    <header className={styles.header}>
      <div
        className={styles.municipality}
        onClick={() => {
          setSchool(null);
        }}
      >
        <div>{municipality}</div>
      </div>

      <div
        className={styles.school}
        onClick={() => {
          setSchool(null);
        }}
      >
        <div>{school.label}</div>
      </div>
    </header>
  );
};

export default Titles;
