

import { useState, useEffect } from 'react';
import styles from './Slideshow.module.css';

const images = [
    '../../assets/img/airplane1.png',
    '../../assets/img/airplane2.jpg',
    '../../assets/img/airplane3.jpg',
];

export default function Slideshow() {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className={styles.slideshow}>
            {images.map((src, index) => (
                <img
                    key={src}
                    src={src}
                    alt={`Airline ${index + 1}`}
                    className={`${styles.slide} ${index === currentImage ? styles.active : ''}`}
                />
            ))}
        </div>
    );
}
