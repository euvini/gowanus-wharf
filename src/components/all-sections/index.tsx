/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Section1 from '../../components/picture-section-1';
import Section2 from '../../components/picture-section-2';
import Section3 from '../../components/picture-section-3';
import Section4 from '../../components/picture-section-4';
import Section5 from '../../components/picture-section-5';
import BackgroundColors from '../../components/backgroud-colors/index'
import styles from '../../app/page.module.scss'

export default function PictureSection({ backgroundColorRef }) {
    const [backgrounds, setBackgrounds] = useState([]);
    const [loading, setLoading] = useState(false);
    const colors = ['#E0DED4', '#DE9280', '#5B9DAD', '#CFBCA4'];

    const generateNewBackgroud = () => {
        const order = [0, 0, 1, 1, 0, 0, 0, 3, 3, 0, 0, 0, 0, 2, 2, 0, 0, 0]; // Ordem desejada das cores
        const newElements = [];

        for (let i = 0; i < 100; i++) {
            const index = order[i % order.length]; // Usa o módulo para repetir a ordem
            newElements.push(
                <BackgroundColors
                    backgroundColorRef={backgroundColorRef}
                    backgroundColor={colors[index]} // Usa o índice para buscar a cor no array de cores
                    key={backgrounds.length + i}
                />
            );
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
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
            <Section5 />
        </>
    )
}