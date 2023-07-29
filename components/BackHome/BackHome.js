import styles from './BackHome.module.css'


const BackHome = ({ setSchool }) => {

    return (
        <div
            className={styles.backHome}
            onClick={() => { setSchool(null) }}
        >
            ← Voltar ao início
        </div>
    );
}

export default BackHome;