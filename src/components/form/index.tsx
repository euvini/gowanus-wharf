import { useEffect, useState } from 'react';
import styles from './form.module.scss';
import { FormStateStore } from '../../store/formState';

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
            <form method="POST" onSubmit={handleSubmit} className={styles.form}>
                <div>
                    <label htmlFor="name">First name*</label>
                    <input type="text" id="name" name="name" />
                </div>
                <div>
                    <label htmlFor="lastname">Last name*</label>
                    <input type="text" id="lastname" name="lastname" />
                </div>
                <div>
                    <label htmlFor="email">Email*</label>
                    <input type="email" id="email" name="email" />
                </div>
                <div>
                    <label htmlFor="zipcode">Zipcode*</label>
                    <input type="text" id="zipcode" name="zipcode" />
                </div>
                <div>
                    <label htmlFor="opcoes">Residence type of interest*</label>
                    <select id="opcoes" name="opcoes">
                        <option value="studio">Studio</option>
                        <option value="1 bed">1 bed</option>
                        <option value="2 bed">2 bed</option>
                        <option value="3 bed">3 bed</option>
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Form;
