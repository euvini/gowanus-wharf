import React, { useEffect } from 'react';
import { useState } from 'react';

const BackgroundColors = ({ backgroundColorRef }) => {
    const [backgroundColor, setBackgroundColor] = useState('#e0ded4');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const colors = ['#E0DED4', '#DE9280', '#5B9DAD', '#CFBCA4']; // Lista de cores

    useEffect(() => {
        const selectRandomColor = () => {
            const randomIndex = Math.floor(Math.random() * colors.length);
            const randomColor = colors[randomIndex];
            setBackgroundColor(randomColor);
        };
        selectRandomColor()
    }, [colors])

    return (
        <div ref={backgroundColorRef}
            style={{
                backgroundColor: backgroundColor,
                width: '100%',
                height: '100%',
                zIndex: -1,
                marginBottom: -1,
            }}
        />
    );
};

export default BackgroundColors;
