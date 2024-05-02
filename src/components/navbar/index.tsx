import React from 'react';
import styles from './navbar.module.scss'; // Estilo CSS para a Navbar
import Link from 'next/link';

const BottomNavbar = ({ inquire }) => {
    return (
        <nav className={styles.navbar} style={{ display: 'flex' }}>
            <div className={styles.buttonWrapperLeft} onClick={inquire}>
                <span className={styles.link}>
                    Inquire
                </span>
            </div>
            <div className={styles.buttonWrapperRight}>
                <Link href="/" className={styles.link} >
                    Instagram
                </Link>
            </div>
        </nav>
    );
};

export default BottomNavbar;
