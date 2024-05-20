import { useEffect, useState } from 'react';
import styles from './form.module.scss';

const Form = ({ onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleFormOpen = (onClose: boolean | ((prevState: boolean) => boolean)) => {
        setIsVisible(onClose);
    };

    useEffect(() => {
        handleFormOpen(onClose)
    }, [onClose])

    return (
        <div className={`${styles['formulario-container']} ${isVisible ? styles['slide-in'] : styles['slide-out']}`}>
            <button onClick={() => handleFormOpen(false)} className={styles['close-button']}>X</button>
            <h1 className={styles.title}>Leasing January 2025</h1>
            <form onSubmit={() => handleFormOpen(false)} className={styles.form}>
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
                    <label htmlFor="opcoes">Residence type of Interest*</label>
                    <select id="opcoes" name="opcoes">
                        <option value="opcao1">Opção 1</option>
                        <option value="opcao2">Opção 2</option>
                        <option value="opcao3">Opção 3</option>
                        <option value="opcao4">Opção 4</option>
                        <option value="opcao5">Opção 5</option>
                    </select>
                </div>
                <button type="submit" onClick={() => { }}>Submit</button>
            </form>
        </div>
    );
};

export default Form;
