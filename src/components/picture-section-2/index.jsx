/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import gsap from 'gsap';
import Image from "next/image";
import styles from '../components.module.scss';
import Picture1 from '../../../public/medias/gallery/2024_GW_MVP_7_Union.png';
import Picture2 from '../../../public/medias/gallery/2024_GW_MVP_8_JobSite.gif';
import Picture3 from '../../../public/medias/gallery/2024_GW_MVP_9_TonyHouses.gif';
import Picture4 from '../../../public/medias/gallery/2024_GW_MVP_10_Claro.jpg';
import Picture5 from '../../../public/medias/gallery/2024_GW_MVP_11_Basketball.gif';
import Picture6 from '../../../public/medias/gallery/2024_GW_MVP_12_Moonkata.jpg';
import Picture7 from '../../../public/medias/gallery/2024_GW_MVP_13_Architecture.jpg';
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)
export default function Index() {
    const container = useRef(null);
    const images = [Picture1, Picture2, Picture3, Picture4, Picture5, Picture6, Picture7];
    const captions = [
        "WE'VE GOT BIG PLANS",
        'WHAT CAN YOU SEE FROM YOUR ROOF? ',
        'TINY HOUSES BY ARTS GOWANUS ARTIST TONY STANZIONE',
        'LOCAL EATS ABOUND',
        'NOTHIN BUT NET',
        'ARTIST DUO MOONTAKA MAKE ART THAT WILL MAKE YOU HAPPY'
    ];

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
                        function checkImageUrlExtension(url) {
                            const validExtensions = ['.mov', '.mp4'];
                            return validExtensions.some(ext => url?.src?.endsWith(ext));
                        }

                        return <div key={`i_${i}`} ref={el => imagesRef.current[i] = el} className={styles.imageContainerSection2} onClick={() => handleImageClick(i)}>
                            {
                                checkImageUrlExtension(image) ?
                                    <video autoPlay muted loop controls={false}>
                                        <source src={image} type="video/quicktime" />
                                        Your browser does not support the video tag.
                                    </video>
                                    :
                                    <Image
                                        src={image}
                                        alt="image"
                                        fill
                                        loading="lazy"
                                    />
                            }
                            <label className={styles.imageCaption}>{captions[i]}</label>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
