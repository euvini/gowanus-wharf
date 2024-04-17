/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useState, useLayoutEffect, useRef, useEffect } from "react";
import styles from '../../app/page.module.scss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Picture1 from '../../../public/medias/1.png';
import Picture2 from '../../../public/medias/2.png';
import Picture3 from '../../../public/medias/3.png';
import Picture4 from '../../../public/medias/BUILDING3.png';
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger)

export default function Index() {
    const container = useRef(null);
    const images = [Picture1, Picture2, Picture3, Picture4];
    const captions = ['caption text max 2 lines lorem ipsum'];
    const lettersRef = useRef([])
    const imagesRef = useRef([])
    const title1 = useRef(null);
    const [clicked, setClicked] = useState(false);
    const bodyRef = useRef(null);

    let timeout;

    const handleScroll = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            imagesRef.current.forEach((_, index) => handleImageClick(index));
            handleBodyClick();
        }, 1000);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            clearTimeout(timeout);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useLayoutEffect(() => {
        const context = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            })
                .to(title1.current, { y: -10 }, 0)
                .to(imagesRef.current[1], { y: -30 }, 0)
                .to(imagesRef.current[2], { y: -60 }, 0)
            lettersRef.current.forEach((letter, i) => {
                tl.to(letter, {
                    top: Math.floor(Math.random() * -75) - 25,
                }, 0)
            })

        })
        return () => context.revert();
    }, [])

    const handleImageClick = (index) => {
        gsap.to(imagesRef.current[index], { scale: 1.05 });
        setClicked(true);
        setTimeout(() => {
            gsap.to(imagesRef.current[index], { scale: 1, onComplete: () => setClicked(false) });
        }, 2000);
    };

    const handleBodyClick = () => {
        gsap.to(bodyRef.current, { scale: 1.10 });
        setClicked(true);
        setTimeout(() => {
            gsap.to(bodyRef.current, { scale: 1, onComplete: () => setClicked(false) });
        }, 2000);
    };

    return (
        <div ref={container} className={styles.container}>
            <div className={styles.body} onClick={handleBodyClick} ref={bodyRef}>
                <h1 ref={title1}>A new language for living</h1>
            </div>
            <div className={styles.imagesSection1}>
                {
                    images.map((image, i) => {
                        return (
                            <div key={`i_${i}`} ref={el => imagesRef.current[i] = el} className={styles.imageContainerSection1} onClick={() => handleImageClick(i)}>
                                <Image
                                    src={image}
                                    placeholder="blur"
                                    alt="image"
                                    fill
                                />
                                <label className={styles.imageCaption}>{captions[i]}</label>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
