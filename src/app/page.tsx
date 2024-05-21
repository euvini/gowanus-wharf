/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useRef, useState } from 'react';
import { animated } from 'react-spring';
import styles from './page.module.scss';
import Lenis from '@studio-freight/lenis';
import GowanusLogoAnimated from '../components/gowanus-logo';
import PictureSection from '../components/all-sections/index';
import VideoBackground from '../components/background-video';
import IsCallingLetters from '../components/gowanusIsCalling';
import { useRouter } from 'next/navigation'
import BottomNavbar from '../components/navbar';
import Form from '../components/form';
import React from 'react';

export default function Home() {
    const [elements, setElements] = useState([]);
    const [scrollEnabled, setScrollEnabled] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const elementRef = useRef<HTMLDivElement>(null);
    const [showForm, setShowForm] = useState(false);

    const scrollInterval = useRef<NodeJS.Timeout | null>(null);

    const toggleFormulario = () => {
        setShowForm(!showForm);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [router.refresh]);

    useEffect(() => {
        const desappear = setTimeout(() => {
            setScrollEnabled(true);
        }, 6500);

        return () => clearTimeout(desappear);
    }, []);

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
        for (let i = 0; i < 50; i++) { //renderiza até 100 vezes
            newElements.push(<PictureSection backgroundColorRef={elementRef} key={elements.length + i} />);
        }
        return newElements;
    };

    useEffect(() => {
        const desappear = setTimeout(() => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth',
            });
        }, 7000);

        return () => clearTimeout(desappear);
    }, []);

    // AUTOSCROLL

    useEffect(() => {
        const handleMouseMove = () => {
            if (scrollInterval.current) {
                clearInterval(scrollInterval.current);
                scrollInterval.current = null;
            }
        };

        const handleMouseStop = () => {
            scrollInterval.current = setInterval(() => {
                window.scrollBy({ top: 1, behavior: 'smooth' });
            }, 10); // Ajuste a velocidade da rolagem alterando o intervalo
        };

        let mouseMoveTimeout: NodeJS.Timeout;
        const handleMouseActivity = () => {
            clearTimeout(mouseMoveTimeout);
            handleMouseMove();
            mouseMoveTimeout = setTimeout(handleMouseStop, 2000);
        };

        const initial = setTimeout(() => {
            window.addEventListener('mousemove', handleMouseActivity);
        }, 7000);

        return () => {
            window.removeEventListener('mousemove', handleMouseActivity);
            if (scrollInterval.current) {
                clearInterval(scrollInterval.current);
            }
            clearTimeout(initial);
        };
    }, []);

    // AUTOSCROLL

    return (
        <main className={styles.main}>
            {
                showForm &&
                <Form onClose={showForm} />
            }
            <animated.section className={styles.logosection}>
                <VideoBackground />
                <IsCallingLetters />
            </animated.section>
            <GowanusLogoAnimated />
            {
                scrollEnabled &&
                <>
                    {elements}
                    {loading && <p>Loading...</p>}
                    <BottomNavbar inquire={toggleFormulario} />
                </>
            }
        </main>
    );
}
