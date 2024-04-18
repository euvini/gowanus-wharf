import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import styles from '../../app/page.module.scss';
import Image from 'next/image';
import IntroGIF from '../../../public/medias/gallery/2024_GW_MVP_1_TwinklingWater.gif'

const VideoBackground = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [topPosition, setTopPosition] = useState<string | number>();

    useEffect(() => {
        const updateWindowHeight = () => {
            const height = window.innerHeight;
            setTopPosition(height / 3);
        };

        window.addEventListener('resize', updateWindowHeight);

        updateWindowHeight();

        return () => {
            window.removeEventListener('resize', updateWindowHeight);
        };
    }, []);

    const fadeOut = useSpring({
        scale: isVisible ? 1 : 0.5,
        config: { duration: 1500 },
        top: isVisible ? 0 : -topPosition / 3,

    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVisible(false);
        }, 5000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <animated.div style={fadeOut} className={styles.videobackground}>
            <div className={styles.videoFilter} />
            <Image
                src={IntroGIF}
                alt="TwinklingWater"
            />
        </animated.div>
    );
};

export default VideoBackground;
