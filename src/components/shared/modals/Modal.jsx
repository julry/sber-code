import { motion } from "framer-motion";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
    position: absolute;
    inset: 0;
    z-index: 1000;
    background: ${({$isDarken}) => $isDarken ? 'rgba(1, 21, 23, 0.9)' : 'transparent'};
    padding: 0 var(--spacing_md);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Modal = ({isDarken, isDisabledAnimation, ...props}) => (
    <Wrapper  
        {...props}
        $isDarken={isDarken}
        initial={{
            opacity: isDisabledAnimation? 1 : 0,
        }}
        animate={!isDisabledAnimation && {opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration: 0.2}}
    />
)