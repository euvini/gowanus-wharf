/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import GSAP1 from '../../components/picture-section-1';
import GSAP2 from '../../components/picture-section-2';
import BackgroundColors from '../../components/backgroud-colors/index'
import styles from '../../app/page.module.scss'

export default function PictureSection({ backgroundColorRef }) {
    const [backgrounds, setBackgrounds] = useState([]);
    const [loading, setLoading] = useState(false);

    const generateNewBackgroud = () => {
        const newElements = [];
        for (let i = 0; i < 100; i++) { //renderiza até 100 vezes
            newElements.push(
                <BackgroundColors backgroundColorRef={backgroundColorRef} key={backgrounds.length + i} />);
        }
        return newElements;
    };

    useEffect(() => {
        function handleScroll() {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

            if (scrollTop + clientHeight >= scrollHeight - 50 && !loading) {
                setLoading(true);
                setTimeout(() => {
                    const newBackgrouns = generateNewBackgroud();
                    setBackgrounds(prevElements => [...prevElements, ...newBackgrouns]);
                    setLoading(false);
                }, 1000);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading]);

    useEffect(() => {
        const initialBackgrounds = generateNewBackgroud();
        setBackgrounds(initialBackgrounds);
    }, []);

    return (
        <>
            <div className={styles.backgroundColors}>
                {backgrounds}
            </div>
            <GSAP1 />
            <GSAP2 />
        </>
    )
}