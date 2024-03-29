import styles from './alert.module.css';

const Alert = ({ children }) => (
    <span className={styles.alert} role="alert">
    {children}
  </span>
);

export default Alert;
