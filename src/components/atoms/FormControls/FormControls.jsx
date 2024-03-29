import styles from './formControls.module.css';

const FormControls = ({ backButton, submitButton, ...props }) => (
    <div className={styles.formControls} {...props}>
        {backButton !== undefined && (
            <button className={styles.formControlsBtn} type="button" {...backButton}>
                Back
            </button>
        )}
        <button className={styles.formControlsBtn} type="submit" {...submitButton}>
            Next
        </button>
    </div>
);

export default FormControls;
