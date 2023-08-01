import styles from './Titles.module.css'

const Titles = ({ municipality, school }) => {

    return (
        <header className={styles.header}>

            <div className={styles.municipality}>
                <div>
                {municipality}
                </div>
            </div>

            <div className={styles.school}>
                <div>
                {school.label}
                </div>
            </div>

        </header>
    );
}

export default Titles;