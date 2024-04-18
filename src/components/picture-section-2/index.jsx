/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from '../../app/page.module.scss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Picture4 from '../../../public/medias/gallery/2024_GW_MVP_14_Rollerwave.gif';
import Picture5 from '../../../public/medias/gallery/2024_GW_MVP_17_JenLewin.jpg';
import Picture6 from '../../../public/medias/gallery/2024_GW_MVP_6_JenLewin.gif';
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger)

export default function Index() {
    const container = useRef(null);
    const images = [Picture4, Picture5, Picture6];
    const captions = ['caption text max', 'caption text max 2 lines lorem ipsum', 'caption text max 2 lines lorem ipsum'];
    const [clicked, setClicked] = useState(false);
    const lettersRef = useRef([])
    const imagesRef = useRef([])
    const bodyRef = useRef(null);
    const title1 = useRef(null);

    let timeout;

    const handleScroll = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            imagesRef.current.forEach((_, index) => handleImageClick(index));
            handleBodyClick()
        }, 500);
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
                <h1 ref={title1}>1 legacy neighborhood</h1>
            </div>
            <div className={styles.imagesSection2}>
                {
                    images.map((image, i) => {
                        return <div key={`i_${i}`} ref={el => imagesRef.current[i] = el} className={styles.imageContainerSection2} onClick={() => handleImageClick(i)}>
                            <Image
                                src={image}
                                alt="image"
                                fill
                            />
                            <label className={styles.imageCaption}>{captions[i]}</label>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
