import { useEffect, useState } from 'react';
import styles from './form.module.scss';
import { FormStateStore } from '../../store/formState';
import HubspotForm from './hubspotForm'

interface FormProps {
    onClose: boolean;
}

const Form: React.FC<FormProps> = ({ onClose }) => {
    const { isOpen, setIsOpen } = FormStateStore()

    const handleFormOpen = (visibility: boolean) => {
        setIsOpen(visibility);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleFormOpen(false);
    };

    useEffect(() => {
        handleFormOpen(onClose);
    }, [onClose]);

    return (
        <div className={`${styles['formulario-container']} ${isOpen ? styles['slide-in'] : styles['slide-out']}`}>
            <button onClick={() => handleFormOpen(false)} className={styles['close-button']}>X</button>
            <h1 className={styles.title}>Leasing January 2025</h1>
            <HubspotForm />
        </div>
    );
};

export default Form;
