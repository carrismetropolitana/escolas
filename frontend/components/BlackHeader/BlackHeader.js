import styles from './BlackHeader.module.css';

export default function BlackHeader({ text }) {
	return <div className={styles.header}>{text}</div>;
}