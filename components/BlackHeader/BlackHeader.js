import styles from './BlackHeader.module.css'

const BlackHeader = ({text}) => {

    return (
        <div className={styles.header}>
            { text }
        </div>
    );
}

export default BlackHeader;