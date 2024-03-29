import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormFields, FULL_NAME_SCHEMA } from '../../../utils';
import { Alert } from '../../molecules';

import styles from './fullNameForm.module.css';

const FullNameForm = ({ onSubmit, value, children }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(FULL_NAME_SCHEMA),
        defaultValues: value,
    });

    const handleSubmitForm = (value) => {
        onSubmit?.(value);
    };

    return (
        <form
            className={styles.fullNameForm}
            onSubmit={handleSubmit(handleSubmitForm)}
        >
            <div className={styles.fullNameFormField}>
                <input
                    className={styles.fullNameFormInput}
                    placeholder="Full name"
                    {...register(FormFields.FullName)}
                />
                {errors[FormFields.FullName] && (
                    <Alert>{errors[FormFields.FullName].message}</Alert>
                )}
            </div>
            {children}
        </form>
    );
};

export default FullNameForm;
