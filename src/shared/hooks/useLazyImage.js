import { useState, useEffect } from 'react';

const useLazyImage = ({ src, width, height, borderRadius = "12px" }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const imageStyle = {
        display: imageLoaded ? 'block' : 'none',
        width: `${width}px`,
        height: `${height}px`,
        borderRadius,
    };

    const skeletonProps = {
        sx: { bgcolor: 'grey.300', borderRadius },
        variant: "rectangular",
        width,
        height,
        style: { display: imageLoaded ? 'none' : 'block' }
    };

    const onLoad = () => setImageLoaded(true);

    return { imageLoaded, imageStyle, skeletonProps, onLoad };
};

export default useLazyImage;
