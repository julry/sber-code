import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { WEEK_TO_LOBBY } from "../../constants/weekToLobby";
import { useProgress } from "../../contexts/ProgressContext";
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { BackButton } from "./BackButton";
import { Block } from "./Block";
import { FlexWrapper } from './FlexWrapper';

const Wrapper = styled(FlexWrapper)`
    padding: var(--spacing_x4);
`;

const Header = styled(FlexWrapper)`
    flex-direction: row;
    justify-content: space-between;
    padding: var(--spacing_small);
    padding-left: var(--spacing_x3);
    padding-right: calc(var(--spacing_x4) + var(--spacing_small));
    background-color: rgba(0, 49, 60, 0.6);
    border-radius: var(--border-radius-xl);
    flex-grow: 0;
    flex-shrink: 1;
    height: ${({$ratio}) => $ratio * 56}px;
`;

const Title = styled.h3`
    font-size: ${({$ratio}) => $ratio * 22}px;
`;

const Content = styled(FlexWrapper)`
    flex-grow: 1;
    justify-content: center;
    width: 100%;
`;

const BlockStyled = styled(Block)` 
    padding-left: var(--spacing_x4);
    padding-right: var(--spacing_x4);
    text-align: center;
`;

const Image = styled.img`
    width: ${({$ratio}) => $ratio * 170}px;
    height: ${({$ratio}) => $ratio * 170}px;
    margin-bottom: var(--spacing_x4);
`;

const ProgressWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin: var(--spacing_x5) 0;
`;

const ProgressCircle  = styled.div`
    width: ${({$ratio}) => $ratio * 6}px;
    height: ${({$ratio}) => $ratio * 6}px;
    border-radius: 50%;
    background-color: var(--color-green2);
    opacity: ${({$isActive}) => $isActive ? 1 : 0.2};
    transition: opacity 0.2s;

    & + & {
        margin-left: ${({$ratio}) => $ratio * 6}px;
    }
`;

const Descr = styled.p`
    color: var(--color-green2);
    margin-top: var(--spacing_small);
`;

const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
`;

const ArrowButton = styled.button`
    background: transparent;
    outline: none;
    border: none;
    width: ${({$ratio}) => $ratio * 21}px;
    height: ${({$ratio}) => $ratio * 19}px;
    cursor: pointer;

    & svg {
        width: 100%;
        height: 100%;
    }
`;

export const Library = ({ levelCards, week }) => {
    const ratio = useSizeRatio();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cards, setCards] = useState([]);
    const { next, passedWeekLevels } = useProgress();

    const shownCard = useMemo(() => cards[currentIndex], [cards, currentIndex]);
    
    const Progress = () => (
        <ProgressWrapper>
            {cards.map((_, ind) => (
                <ProgressCircle key={`prog_${ind}`} $isActive={ind === currentIndex} $ratio={ratio}/>
            ))}
        </ProgressWrapper>
    );


    const handlePrevClick = () => {
        setCurrentIndex(prev => prev > 0 ? prev - 1 : cards.length - 1);
    }
    
    const handleNextClick = () => {
        setCurrentIndex(prev => prev < (cards.length - 1) ? prev + 1 : 0);
    }

    useEffect(() => {
        let initial = [];
        passedWeekLevels[week].forEach((level) =>
            initial.push(...levelCards[level])
        );

        setCards(initial);
    }, []);

    return (
        <Wrapper>
            <Header  $ratio={ratio}>
                <BackButton onClick={() => next(WEEK_TO_LOBBY[week])}/>
                <Title>Собранные карточки:</Title>
            </Header>
            <Content>
                    {
                        !!cards.length && shownCard &&  (
                            <BlockStyled isWhite>
                                <AnimatePresence>
                                    <motion.div>
                                        <Image $ratio={ratio} src={shownCard?.image} alt={shownCard.name} />
                                        <p>{shownCard.infoText}</p>
                                        {shownCard.isTask && (
                                            <Descr>
                                                {shownCard.buttons.find(({isCorrect}) => isCorrect).answerText}
                                            </Descr>
                                        )}
                                        <Progress />
                                        <ButtonsWrapper>
                                            <ArrowButton $ratio={ratio} onClick={handlePrevClick}>
                                                <svg viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19.5 10.542C20.1904 10.542 20.75 9.98235 20.75 9.29199C20.75 8.60164 20.1904 8.04199 19.5 8.04199V10.542ZM0.616116 8.40811C0.127962 8.89626 0.127962 9.68772 0.616116 10.1759L8.57107 18.1308C9.05922 18.619 9.85068 18.619 10.3388 18.1308C10.827 17.6427 10.827 16.8512 10.3388 16.3631L3.26777 9.29199L10.3388 2.22092C10.827 1.73277 10.827 0.941313 10.3388 0.453157C9.85068 -0.0349979 9.05922 -0.0349979 8.57107 0.453157L0.616116 8.40811ZM19.5 8.04199L1.5 8.04199V10.542L19.5 10.542V8.04199Z" fill="#008C95"/>
                                                </svg>
                                            </ArrowButton>
                                            <ArrowButton $ratio={ratio} onClick={handleNextClick}>
                                                <svg viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1.5 8.04199C0.809644 8.04199 0.25 8.60164 0.25 9.29199C0.25 9.98235 0.809644 10.542 1.5 10.542L1.5 8.04199ZM20.3839 10.1759C20.872 9.68772 20.872 8.89627 20.3839 8.40811L12.4289 0.453159C11.9408 -0.0349961 11.1493 -0.0349963 10.6612 0.453159C10.173 0.941314 10.173 1.73277 10.6612 2.22093L17.7322 9.292L10.6612 16.3631C10.173 16.8512 10.173 17.6427 10.6612 18.1308C11.1493 18.619 11.9408 18.619 12.4289 18.1308L20.3839 10.1759ZM1.5 10.542L19.5 10.542L19.5 8.042L1.5 8.04199L1.5 10.542Z" fill="#008C95"/>
                                                </svg>
                                            </ArrowButton>
                                        </ButtonsWrapper>
                                    </motion.div>
                                </AnimatePresence>
                            </BlockStyled>
                        )
                    }
                </Content>
        </Wrapper>
    )
}