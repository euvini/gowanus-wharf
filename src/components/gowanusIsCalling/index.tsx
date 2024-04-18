import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function IsCallingLetters() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVisible(false);
        }, 6000);

        return () => clearTimeout(timeout);
    }, []);
    return (
        <div style={{ zIndex: isVisible ? 0 : 10 }}>
            <Image width={341} height={232} src="/medias/GWAIC.png" alt="gowanus is calling" />
        </div>
    )
}