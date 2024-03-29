import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    FormFields,
    PAYMENT_METHOD_SCHEMA,
    PaymentMethods,
} from '../../../utils';
import { Alert } from '../../molecules';

import styles from './paymentForm.module.css';

const PaymentForm = ({ onSubmit, value, children }) => {
    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(PAYMENT_METHOD_SCHEMA),
        defaultValues: value,
    });
    const paymentMethodTypeValue = watch(FormFields.PaymentMethodType);

    useEffect(() => {
        if (paymentMethodTypeValue) {
            setValue(FormFields.PaymentMethodEmail, undefined);
            setValue(FormFields.PaymentMethodCardNumber, undefined);
        }
    }, [paymentMethodTypeValue, setValue]);

    const handleSubmitForm = (value) => {
        onSubmit?.(value);
    };

    return (
        <form
            className={styles.paymentForm}
            onSubmit={handleSubmit(handleSubmitForm)}
        >
            <div className={styles.paymentFormField}>
                <fieldset id="paymentMethodRadioGroup">
                    <legend>Please select your preferred payment method:</legend>
                    <input
                        type="radio"
                        id="paypal"
                        value={PaymentMethods.PayPal}
                        {...register(FormFields.PaymentMethodType)}
                    />
                    <label htmlFor="paypal">PayPal</label>
                    <input
                        type="radio"
                        id="creditCard"
                        value={PaymentMethods.CreditCard}
                        {...register(FormFields.PaymentMethodType)}
                    />
                    <label htmlFor="creditCard">Credit Card</label>
                </fieldset>
                {errors.paymentMethod?.type && (
                    <Alert>{errors.paymentMethod?.type.message}</Alert>
                )}

                {paymentMethodTypeValue === PaymentMethods.PayPal && (
                    <>
                        <input
                            className={styles.paymentFormInput}
                            placeholder="PayPal email"
                            type="email"
                            {...register(FormFields.PaymentMethodEmail)}
                        />
                        {errors.paymentMethod?.email && (
                            <Alert>{errors.paymentMethod?.email?.message}</Alert>
                        )}
                    </>
                )}

                {paymentMethodTypeValue === PaymentMethods.CreditCard && (
                    <>
                        <input
                            className={styles.paymentFormInput}
                            placeholder="Credit card number"
                            {...register(FormFields.PaymentMethodCardNumber)}
                        />
                        {errors.paymentMethod?.cardNumber && (
                            <Alert>{errors.paymentMethod?.cardNumber?.message}</Alert>
                        )}
                    </>
                )}
            </div>
            {children}
        </form>
    );
};

export default PaymentForm;
