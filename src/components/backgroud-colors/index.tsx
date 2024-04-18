import React from 'react';

const BackgroundColors = ({ backgroundColorRef, backgroundColor }) => {
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
