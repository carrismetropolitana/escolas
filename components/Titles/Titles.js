import styles from './Titles.module.css'

const Titles = ({ municipality, school }) => {

    return (
        <header className={styles.header}>

            <div className={styles.municipality}>
                {municipality ? municipality.label : 'Nenhum municipio selecionado'}
            </div>

            <div className={styles.school}>
                {school.label}
            </div>

        </header>
    );
}

export default Titles;