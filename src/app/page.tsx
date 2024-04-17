'use client'
import { useEffect, useRef, useState } from 'react';
import styles from './page.module.scss';
import Lenis from '@studio-freight/lenis';
import GowanusLogoAnimated from '../components/gowanus-logo';
import PictureSection from '../components/all-sections/index';
import VideoBackground from '../components/background-video';
import IsCallingLetters from '../components/gowanusIsCalling';
import { useRouter } from 'next/navigation'
import BottomNavbar from '../components/navbar';
import React from 'react';

export default function Home() {
    const [elements, setElements] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [router.refresh]);

    useEffect(() => {
        const lenis = new Lenis();
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }, []);

    useEffect(() => {
        function handleScroll() {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

            if (scrollTop + clientHeight >= scrollHeight - 50 && !loading) {
                setLoading(true);
                setTimeout(() => {
                    const newElements = generateNewElements();
                    setElements(prevElements => [...prevElements, ...newElements]);
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
        const initialElements = generateNewElements();
        setElements(initialElements);
    }, []);

    const generateNewElements = () => {
        const newElements = [];
        for (let i = 0; i < 100; i++) { //renderiza até 100 vezes
            newElements.push(<PictureSection backgroundColorRef={elementRef} key={elements.length + i} />);
        }
        return newElements;
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        }, 10500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <main className={styles.main}>
            <section className={styles.logosection}>
                <VideoBackground />
                <GowanusLogoAnimated />
                <IsCallingLetters />
            </section>
            {elements}
            {loading && <p>Loading...</p>}
            <BottomNavbar />
        </main>
    );
}
