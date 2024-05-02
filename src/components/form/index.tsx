import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './form.module.scss';

const Form = ({ onClose }) => {
    const formRef = useRef(null);

    useEffect(() => {
        gsap.from(formRef.current, {
            duration: 10000,
            y: 100,
            opacity: 1,
            ease: "power3.in"
        });
    }, []);

    return (
        <div ref={formRef} className={styles['formulario-container']}>
            <button onClick={onClose} className={styles['close-button']}>X</button>
            <h1 className={styles.title}>Leasing January 2025</h1>
            <form className={styles.form}>
                <div>
                    <label htmlFor="nome">First name*</label>
                    <input type="text" id="nome" name="nome" />
                </div>
                <div>
                    <label htmlFor="sobrenome">Last name*</label>
                    <input type="text" id="sobrenome" name="sobrenome" />
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
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Form;
