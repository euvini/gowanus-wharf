/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useState, useLayoutEffect, useRef, useEffect } from "react";
import styles from '../components.module.scss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DouglassPort from '../../../public/medias/gallery/DouglassPort.png';
import NevinsLanding from '../../../public/medias/gallery/NevinsLanding.png';
import UnionChannel from '../../../public/medias/gallery/UnionChannel.png';
import Picture1 from '../../../public/medias/gallery/2024_GW_MVP_2_UnionCafe_SR.gif';
import Picture2 from '../../../public/medias/gallery/2024_GW_MVP_3_Demarcus.png';
import Picture3 from '../../../public/medias/gallery/2024_GW_MVP_4_Yoga.jpg';
import Picture4 from '../../../public/medias/gallery/2024_GW_MVP_5_JobSite.jpg';
import Picture5 from '../../../public/medias/gallery/2024_GW_MVP_6_JenLewin.gif';
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger)

export default function Index() {
    const container = useRef(null);
    const images = [DouglassPort, NevinsLanding, UnionChannel, Picture1, Picture2, Picture3, Picture4, Picture5];
    const captions = [
        '',
        '',
        '',
        'GOOD MORNINGS FROM GOWANUS',
        'ARTIST DEMARCUS MCGAUGHEY, AT HIS STUDIO.',
        'FIND YOUR BALANCE IN GOWANUS',
        'ON SITE AT 585 UNION',
        'ARTIST JEN LEWIN, AT WORK WITH [NAME OF ART PIECE HERE]',
    ];
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
        }, 100);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            clearTimeout(timeout);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
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
        }, 1000);
    };

    const handleBodyClick = () => {
        gsap.to(bodyRef.current, { scale: 1.10 });
        setClicked(true);
        setTimeout(() => {
            gsap.to(bodyRef.current, { scale: 1, onComplete: () => setClicked(false) });
        }, 1000);
    };

    return (
        <div ref={container} className={styles.container}>
            {/* <div className={styles.body} onClick={handleBodyClick} ref={bodyRef}>
                <h1 ref={title1}>A new language for living</h1>
            </div> */}
            <div className={styles.imagesSection1}>
                {
                    images.map((image, i) => {
                        return (
                            <div key={`i_${i}`} ref={el => imagesRef.current[i] = el} className={styles.imageContainerSection1} onClick={() => handleImageClick(i)}>
                                <Image
                                    src={image}
                                    alt="image"
                                    fill
                                    loading="lazy"
                                />
                                <span className={styles.imageCaption}>{captions[i]}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
