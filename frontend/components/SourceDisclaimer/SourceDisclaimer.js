import styles from './SourceDisclaimer.module.css';

export default function SourceDisclaimer() {
  return (
    <div className={styles.container}>
      <p>
        Os dados demonstrados nesta página baseiam-se na lista de escolas disponibilizada pelo Ministério da Educação, atualizada para 2023. A análise, que está em constante atualização, considera uma distância pedonal de 5 minutos, ajustada de
        acordo com o conhecimento de cada local e a totalidade da oferta da rede Carris Metropolitana. A exatidão desta análise depende da qualidade das redes viária e pedonal e da geocodificação das localizações das escolas.
      </p>
      <a href="https://github.com/carrismetropolitana/datasets" target="_blank">
        Saiba mais aqui
      </a>
    </div>
  );
}
