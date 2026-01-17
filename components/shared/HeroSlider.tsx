
import React, { useState, useEffect } from 'react';

interface HeroSliderProps {
    images: string[];
    interval?: number;
}

const HeroSlider: React.FC<HeroSliderProps> = ({ images, interval = 5000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, interval);
        return () => clearInterval(timer);
    }, [images.length, interval]);

    return (
        <div className="absolute inset-0 z-0 h-full w-full">
            {images.map((img, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <img
                        src={img}
                        alt={`Zen Nature ${index + 1}`}
                        className="w-full h-full object-cover scale-105 animate-subtle-zoom"
                    />
                    {/* Dark Overlays for readability */}
                    <div className="absolute inset-0 bg-sage-900/40 mix-blend-multiply"></div>
                    <div className="absolute inset-10 bg-gradient-to-t from-sage-900 via-transparent to-transparent opacity-60"></div>
                </div>
            ))}

            {/* Slider Indicators */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-1 transition-all duration-500 rounded-full ${index === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/40'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSlider;
