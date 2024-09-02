import { AnimatePresence } from "framer-motion";
import {useEffect, useMemo} from "react";
import styled from 'styled-components';
import { preloadImages } from "../constants/screensComponents";
import { useProgress } from "../contexts/ProgressContext";
import { useImagePreloader } from "../hooks/useImagePreloader";
import {getModalByType} from "../utils/getModalByType";

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    ${({$blur}) => $blur ? 'filter: blur(5.5px)' : ''};
`;

export function ScreenContent() {
    const {screen, modal} = useProgress();
    const Screen = useMemo(() => screen, [screen]);
    useImagePreloader(preloadImages);

    useEffect(() => {
        const preventDefault = (e) => e.preventDefault();
        
        document.body.addEventListener('touchmove', preventDefault, { passive: false });
        
        return () => document.body.removeEventListener('touchmove', preventDefault);
    }, [])

    return Screen &&(
        <>
            <Wrapper $blur={modal.visible}>
                <Screen />
            </Wrapper>
            <AnimatePresence key={modal.type}>
                {modal.visible && modal.type && getModalByType(modal.type)}
            </AnimatePresence>
        </>
    )
}