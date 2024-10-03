import { useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import doorPic from '../../assets/images/prizesDoor.png';
import keyPic from '../../assets/images/prizesKey.png';
import opened from '../../assets/images/door.png';
import { FlexWrapper } from "../shared/FlexWrapper"
import { Button } from "../shared/Button";
import { useProgress } from "../../contexts/ProgressContext";
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { reachMetrikaGoal } from "../../utils/reachMetrikaGoal";

const Wrapper = styled(FlexWrapper)`
    justify-content: center;
`;

const KeyStyled = styled(motion.div)`
    display:flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    background: url(${keyPic}) no-repeat 0 center;
    background-size: cover;
    padding:  ${({$ratio}) => $ratio * 60}px ${({$ratio}) => $ratio * 22}px;
    justify-content: flex-end;
    font-size: ${({$ratio}) => $ratio * 22}px;
`;

const DoorWrapper = styled(KeyStyled)`
    background-image: url(${doorPic});
    padding-top: 0;
    justify-content: flex-start;
`;

const Door = styled.div`
    width: ${({$ratio}) => $ratio * 211}px;
    margin-top: ${({$ratio}) => $ratio * 111}px;
    margin-bottom: ${({$ratio}) => $ratio * 22}px;
    height: ${({$ratio}) => $ratio * 403}px;
    background: rgba(255, 255, 255, 0.2);
    background-image: url(${opened});
    background-size: contain;
    background-position: 0 0;
    background-repeat: no-repeat;
`;

export const Prizes = () => {
    const ratio = useSizeRatio();
    const {user,next} = useProgress();
    const [isDoor, setIsDoor] = useState(false);

    const handleNext = () => {
        reachMetrikaGoal(`${user.isVip ? '' : 'non'}target_final`);
        next();
    };

    return (
        <Wrapper>
            <AnimatePresence>
                {isDoor ? (
                    <DoorWrapper 
                        $ratio={ratio} 
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.3}}
                    >
                        <Door $ratio={ratio}/>
                        <Button onClick={handleNext}>Открыть</Button>
                    </DoorWrapper>
                ): (
                    <KeyStyled 
                        exit={{opacity: 0}}
                        onClick={() => setIsDoor(true)} 
                        $ratio={ratio}
                        transition={{duration: 0.3}}
                    > 
                        <p>
                            А вот и твой главный приз! Это — ключ, открывающий тебе путь в успешную карьеру в Сбере.
                        </p>
                    </KeyStyled>
                )}
            </AnimatePresence>
        </Wrapper>
    )
}