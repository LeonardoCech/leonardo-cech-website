import { useState, useEffect } from 'react';

/**
 * Hook personalizado que detecta se a visualização atual é mobile
 * @returns boolean indicando se a tela está em modo mobile
 */

const useIsMobile = (): boolean => {
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        setIsMobile(window.innerWidth <= 768);

        const onResize = () => setIsMobile(window.innerWidth <= 768);

        window.addEventListener('resize', onResize);

        return () => window.removeEventListener('resize', onResize);
    }, []);

    return isMobile;
};

export default useIsMobile;