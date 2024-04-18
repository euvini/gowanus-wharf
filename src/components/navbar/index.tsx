import React, { useEffect, useState } from 'react';
import styles from './navbar.module.scss'; // Estilo CSS para a Navbar
import Link from 'next/link';

const BottomNavbar = () => {
    const [showNavBar, setShowNavBar] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowNavBar(true)
        }, 7000);

        return () => clearTimeout(timer);
    }, []);
    return (
        <nav className={styles.navbar} style={{ display: showNavBar ? 'flex' : 'none' }}>
            <div className={styles.buttonWrapperLeft}>
                <Link href="/" className={styles.link}>
                    Inquire
                </Link>
            </div>
            <div className={styles.middleButtonWrapper}>
                <Link href="/" className={styles.link}>
                    Instagram
                </Link>
            </div>
            <div className={styles.buttonWrapperRight}>
                <Link href="/" className={styles.link} >
                    Contact
                </Link>
            </div>
        </nav>
    );
};

export default BottomNavbar;
