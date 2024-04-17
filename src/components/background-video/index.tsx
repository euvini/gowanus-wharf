import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import styles from '../../app/page.module.scss';

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
        config: { duration: 3000 },
        top: isVisible ? 0 : -topPosition / 3,

    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVisible(false);
        }, 6500);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <animated.div style={fadeOut} className={styles.videobackground}>
            <div className={styles.videoFilter} />
            <video autoPlay loop muted>
                <source src="/medias/water.mov" type="video/mp4" />
                This browser do not support HTML5 videos.
            </video>
        </animated.div>
    );
};

export default VideoBackground;
