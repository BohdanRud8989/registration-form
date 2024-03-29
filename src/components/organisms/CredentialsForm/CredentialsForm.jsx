import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CREDENTIALS_SCHEMA, FormFields } from '../../../utils';
import { Alert } from '../../molecules';

import styles from './credentialsForm.module.css';

const CredentialsForm = ({ onSubmit, value, children }) => {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(CREDENTIALS_SCHEMA),
        defaultValues: value,
    });

    const handleSubmitForm = (value) => {
        onSubmit?.(value);
    };

    return (
        <form
            className={styles.credentialsForm}
            onSubmit={handleSubmit(handleSubmitForm)}
        >
            <div className={styles.credentialsFormField}>
                <input
                    className={styles.credentialsFormInput}
                    placeholder="Email"
                    type="email"
                    {...register(FormFields.Email)}
                />
                {errors[FormFields.Email] && (
                    <Alert>{errors[FormFields.Email].message}</Alert>
                )}
            </div>
            <div className={styles.credentialsFormField}>
                <input
                    className={styles.credentialsFormInput}
                    placeholder="Password"
                    type="password"
                    {...register(FormFields.Password)}
                />
                {errors[FormFields.Password] && (
                    <Alert>{errors[FormFields.Password].message}</Alert>
                )}
            </div>
            <div className={styles.credentialsFormField}>
                {watch(FormFields.Password) !== undefined && (
                    <input
                        className={styles.credentialsFormInput}
                        placeholder="Confirm password"
                        type="password"
                        {...register(FormFields.ConfirmPassword)}
                    />
                )}
                {errors[FormFields.ConfirmPassword] && (
                    <Alert>{errors[FormFields.ConfirmPassword].message}</Alert>
                )}
            </div>
            {children}
        </form>
    );
};

export default CredentialsForm;
