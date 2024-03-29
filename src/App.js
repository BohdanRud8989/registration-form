import { useCallback, useState } from 'react';
import * as yup from 'yup';
import { FULL_REGISTRATION_SCHEMA, FormFields, RegistrationSteps } from './utils';
import {
    FormControls,
    FullNameForm,
    CredentialsForm,
    PaymentForm,
} from './components';

import styles from './app.module.css';

function App() {
    const [currentStep, setCurrentStep] = useState(RegistrationSteps.FULL_NAME);
    const [value, setValue] = useState({
        [FormFields.FullName]: undefined,
        [FormFields.Email]: undefined,
        [FormFields.Password]: undefined,
        [FormFields.ConfirmPassword]: undefined,
        [FormFields.PaymentMethod]: {
            type: undefined,
            email: undefined,
            cardNumber: undefined,
        },
    });

    const validateFullSchema = useCallback(async (newValue) => {
        try {
            await FULL_REGISTRATION_SCHEMA.validate(newValue, { abortEarly: false });
            console.log('App: Validation successful: newValue: ', newValue);
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                console.error('App: Validation error:', error.errors.join(', '));
            } else {
                console.error('App: Validation other error:', error.message);
            }
        }
    }, []);

    const nextStep = useCallback(() => {
        setCurrentStep((preStep) =>
            preStep < RegistrationSteps.PAYMENT ? preStep + 1 : preStep
        );
    }, []);

    const prevStep = () => {
        setCurrentStep((preStep) =>
            preStep > RegistrationSteps.FULL_NAME ? preStep - 1 : preStep
        );
    };

    const handleStepSubmitAndValidate = useCallback(
        async (stepValue) => {
            const newValue = { ...value, ...stepValue };
            setValue(newValue);
            if (currentStep < RegistrationSteps.PAYMENT) {
                nextStep();
            } else {
                await validateFullSchema(newValue);
            }
        },
        [nextStep, value, currentStep, validateFullSchema]
    );

    return (
        <section className={styles.container}>
            {(() => {
                switch (currentStep) {
                    case RegistrationSteps.FULL_NAME:
                        return (
                            <FullNameForm
                                onSubmit={handleStepSubmitAndValidate}
                                value={{ [FormFields.FullName]: value[FormFields.FullName] }}
                            >
                                <FormControls backButton={{ onClick: prevStep }} />
                            </FullNameForm>
                        );

                    case RegistrationSteps.CREDENTIALS:
                        return (
                            <CredentialsForm
                                onSubmit={handleStepSubmitAndValidate}
                                value={{
                                    [FormFields.Email]: value[FormFields.Email],
                                    [FormFields.Password]: value[FormFields.Password],
                                    [FormFields.ConfirmPassword]:
                                        value[FormFields.ConfirmPassword],
                                }}
                            >
                                <FormControls backButton={{ onClick: prevStep }} />
                            </CredentialsForm>
                        );

                    case RegistrationSteps.PAYMENT:
                        return (
                            <PaymentForm
                                onSubmit={handleStepSubmitAndValidate}
                                value={{
                                    [FormFields.PaymentMethod]: value[FormFields.PaymentMethod],
                                }}
                            >
                                <FormControls backButton={{ onClick: prevStep }} />
                            </PaymentForm>
                        );
                    default:
                        return null;
                }
            })()}
        </section>
    );
}

export default App;
