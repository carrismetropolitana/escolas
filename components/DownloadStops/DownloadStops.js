import styles from './DownloadStops.module.css'

const DownloadStops = () => {

    return (
        <div>

            <div className={styles.text}>
                Descarregue a lista de paragens e linhas aqui:
            </div>

            <a href="https://www.carrismetropolitana.pt/planeador/">
                <div className={styles.button}>
                    Download
                </div>
            </a>
            ´
        </div>
    );
}

export default DownloadStops;