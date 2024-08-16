import { useEffect, useRef } from 'react';

const useEffectSkipFirstRender = (effect, dependencies) => {
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        effect();
    }, dependencies); 
};

export default useEffectSkipFirstRender;
