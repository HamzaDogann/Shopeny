import React, { useState, useEffect } from 'react';

function RemainingTime() {
    const [time, setTime] = useState(180); 

    useEffect(() => {
        if (time > 0) {
            const timer = setInterval(() => {
                setTime(prevTime => prevTime - 1);
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [time]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <span className='remaining-time'>
            <strong>Kalan Süre :</strong> {formatTime(time)}
        </span>
    );
}

export default RemainingTime;