import React, { useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";

const SuperDealCards = () => {
    const navigate = useNavigate();

    const refs = {
        largeBoxH2: useRef(null),
        largeBoxP: useRef(null),
        smallBox1H2: useRef(null),
        smallBox1P: useRef(null),
        smallBox2H2: useRef(null),
        smallBox2P: useRef(null),
    };
    
    const isInView = {
        largeBoxH2: useInView(refs.largeBoxH2, { once: true }),
        largeBoxP: useInView(refs.largeBoxP, { once: true }),
        smallBox1H2: useInView(refs.smallBox1H2, { once: true }),
        smallBox1P: useInView(refs.smallBox1P, { once: true }),
        smallBox2H2: useInView(refs.smallBox2H2, { once: true }),
        smallBox2P: useInView(refs.smallBox2P, { once: true }),
    };

    const handleNavigate = (path) => {
        navigate(path);
    };

    const animatedStyle = (isVisible, delay = 0) => ({
        transform: isVisible ? "none" : "translateY(50px)",
        opacity: isVisible ? 1 : 0,
        transition: `all 1s ease-in-out ${delay}s`
    });

    return (
        <div className="super-deal-cards-box">
            <div className="large-box">
                <motion.h2
                    ref={refs.largeBoxH2}
                    style={animatedStyle(isInView.largeBoxH2)}
                >
                    Sesin Ötesinde
                </motion.h2>
                <motion.p
                    ref={refs.largeBoxP}
                    style={animatedStyle(isInView.largeBoxP, 0.2)}
                >
                    Mükemmel ses kalitesi ve konforu bir arada sunan marka kulaklıklar indirimde. Favori müziğinizi, podcast'lerinizi en yüksek ses kalitesinde dinleyin.
                </motion.p>
                <Link to="/kulaklik">Ürünlere Gözat</Link>
            </div>

            <div className="small-boxes">
                <div className="small-box" onClick={() => handleNavigate('/telefon')}>
                    <motion.h2
                        ref={refs.smallBox1H2}
                        style={animatedStyle(isInView.smallBox1H2)}
                    >
                        Teknolojinin Zirvesi
                    </motion.h2>
                    <motion.p
                        ref={refs.smallBox1P}
                        style={animatedStyle(isInView.smallBox1P, 0.2)}
                    >
                        En yeni özellikler ve şık tasarımıyla dikkat çeken telefonlar, özel indirimlerle sizlerle buluşuyor!
                    </motion.p>
                </div>

                <div className="small-box" onClick={() => handleNavigate('/televizyon')}>
                    <motion.h2
                        ref={refs.smallBox2H2}
                        style={animatedStyle(isInView.smallBox2H2)}
                    >
                        Göz Alıcı Görüntüler
                    </motion.h2>
                    <motion.p
                        ref={refs.smallBox2P}
                        style={animatedStyle(isInView.smallBox2P, 0.2)}
                    >
                        Sinema kalitesinde görüntü ve ses deneyimi sunan en kaliteli televizyonlar, özel indirim fırsatlarıyla evinize geliyor!
                    </motion.p>
                </div>
            </div>
        </div>
    );
};

export default SuperDealCards;
