import { useState } from "react";
import styled from "styled-components";
import { weeks } from "../../../constants/weeks";
import { useProgress } from "../../../contexts/ProgressContext";
import { useSizeRatio } from "../../../hooks/useSizeRatio";
import { Game } from "../../shared/Game";
import { GameInput } from "../../shared/GameInput";
import { FirstItem } from "./FirstItem";
import { SecondItem } from "./SecondItem";
import { ThirdItem } from "./ThirdItem";
import { FourthItem } from "./FourthItem";
import { FifthItem } from "./FifthItem";

const Content = styled.div`
    padding: calc(var(--spacing_x5) * 1.8) 0;
`;

const InputStyled = styled(GameInput)`
    margin-bottom: ${({$ratio}) => $ratio * 10}px;
`;

const WordWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: ${({$ratio}) => $ratio * 34}px;
`;

const InputWrapper = styled.div`
    margin-left: var(--spacing_small);
`;

const Line = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    
    & + & { 
        margin-top: var(--spacing_x5);
    }
`;

const FirstItemStyled = styled(FirstItem)`
    width: ${({$ratio}) => $ratio * 101}px;
    height: ${({$ratio}) => $ratio * 98}px;
    margin-right: var(--spacing_x3);
`;

const SecondItemStyled = styled(SecondItem)`
    width: ${({$ratio}) => $ratio * 109}px;
    height: ${({$ratio}) => $ratio * 98}px;
    margin-right: var(--spacing_x3);
`;

const ThirdItemStyled = styled(ThirdItem)`
    width: ${({$ratio}) => $ratio * 93}px;
    height: ${({$ratio}) => $ratio * 85}px;
`;

const FourthItemStyled = styled(FourthItem)`
    width: ${({$ratio}) => $ratio * 98}px;
    height: ${({$ratio}) => $ratio * 77}px;
    margin-right:  ${({$ratio}) => $ratio * 38}px;

`;
const FifthItemStyled = styled(FifthItem)`
    width: ${({$ratio}) => $ratio * 119}px;
    height: ${({$ratio}) => $ratio * 110}px;
    margin-top:  ${({$ratio}) => $ratio * -12}px;
`;

const InputTip = styled.svg`
    opacity: ${({$draken}) => $draken  ? 0.2 : 1};
    width: ${({$ratio, $width}) => $ratio * 24}px;
    height: ${({$ratio, $height}) => $ratio * 24}px;
    transition: opacity 0.3s;
`;

export const Game4 = () => {
    const { setModal, user} = useProgress();
    const [firstWord, setFirstWord] = useState(['', '', '', '', '', '', '']);
    const ratio = useSizeRatio();
    const week = weeks.find(({id}) => id === 4);

    const allTips = user.weekTips[4] === 3;

    const handleChange = (e, index) => {
        const value = e.target.value.length > 1 ? e.target.value.slice(-1) : e.target.value; 
        const word = [...firstWord];
        if (value === ' ') return;
        
        word[index] = value.toUpperCase();
        setFirstWord(word);
    };

    const handleCheck = () => {
        if (
            firstWord.join('').toUpperCase() === week.answer[0].toUpperCase() 
        ) {
            setModal({
                visible: true, 
                type: 'win',
                week: 4, 
                text: 'Что общего между гимнастами и работой в Сбере? Гибкость! Здесь ты можешь адаптировать свою ' + 
                'нагрузку, а иногда и работать удалённо.'
            });

            return true;
        } else  setModal({
            visible: true, 
            type: 'lose', 
            week: 4, 
            text: 'Разгадка шифра уже рядом — попробуй снова, и у тебя точно получится!'
        });
    }

    return (
        <Game 
            week={4} 
            buttonDisabled={firstWord.filter(f => f.length).length < 7}
            onAnswer={handleCheck}
        >
            <Content>
                <Line>
                    <FirstItemStyled $ratio={ratio} isShownLetters={allTips}/>
                    <SecondItemStyled $ratio={ratio} isShownLetters={allTips}/>
                    <ThirdItemStyled $ratio={ratio} isShownLetters={allTips}/>
                </Line>
                <Line>
                    <FourthItemStyled $ratio={ratio} isShownLetters={allTips}/>
                    <FifthItemStyled $ratio={ratio} isShownLetters={allTips}/>
                </Line>
                <WordWrapper $ratio={ratio}>
                    <div>
                        <InputStyled $ratio={ratio} value={firstWord[0]} onChange={(e) => handleChange(e, 0, true)}/>
                        <InputTip $ratio={ratio} $draken={!!firstWord[0]} viewBox="0 0 24 24">
                            <mask id="path-1-inside-1_182_5537" fill="white">
                            <path d="M0 0H24V24H0V0Z"/>
                            </mask>
                            <path d="M24 0H25V-1H24V0ZM24 24V25H25V24H24ZM0 1H24V-1H0V1ZM23 0V24H25V0H23ZM24 23H0V25H24V23Z" fill="white" mask="url(#path-1-inside-1_182_5537)"/>
                        </InputTip>
                    </div>
                    <InputWrapper $ratio={ratio}>
                        <InputStyled $ratio={ratio} value={firstWord[1]} onChange={(e) => handleChange(e, 1, true)}/>
                        <InputTip $ratio={ratio} $draken={!!firstWord[1]} fill="none" viewBox="0 0 24 24">
                            <mask id="path-1-inside-1_2181_3327" fill="white">
                            <path d="M0 0H24V24H0V0Z"/>
                            </mask>
                            <path d="M24 24V25H25V24H24ZM23 0V24H25V0H23ZM24 23H0V25H24V23Z" fill="white"/>
                            <circle cx="17.4702" cy="17.4702" r="2.47019" transform="rotate(90 17.4702 17.4702)" fill="white"/>
                        </InputTip>
                    </InputWrapper>
                    <InputWrapper $ratio={ratio}>
                        <InputStyled $ratio={ratio} value={firstWord[2]} onChange={(e) => handleChange(e, 2, true)}/>
                        <InputTip $ratio={ratio} $draken={!!firstWord[2]}  viewBox="0 0 24 24">
                            <mask id="path-1-inside-1_2181_3328" fill="white">
                            <path d="M0 0H24V24H0V0Z"/>
                            </mask>
                            <path d="M0 0V-1H-1V0H0ZM24 0H25V-1H24V0ZM24 24V25H25V24H24ZM0 24H-1V25H0V24ZM0 1H24V-1H0V1ZM23 0V24H25V0H23ZM24 23H0V25H24V23ZM1 24V0H-1V24H1Z" fill="white" mask="url(#path-1-inside-1_2181_3328)"/>
                            <circle cx="12.4702" cy="17.4702" r="2.47019" transform="rotate(90 12.4702 17.4702)" fill="white"/>
                        </InputTip>
                    </InputWrapper>
                    <InputWrapper $ratio={ratio}>
                        <InputStyled $ratio={ratio} value={firstWord[3]} onChange={(e) => handleChange(e, 3)}/>
                        <InputTip $ratio={ratio} $draken={!!firstWord[3]}  viewBox="0 0 24 24">
                            <mask id="path-1-inside-1_2181_3329" fill="white">
                            <path d="M24 0H0V24H24V0Z"/>
                            </mask>
                            <path d="M0 0H-1V-1H0V0ZM0 24V25H-1V24H0ZM24 1H0V-1H24V1ZM1 0V24H-1V0H1ZM0 23H24V25H0V23Z" fill="white" mask="url(#path-1-inside-1_2181_3329)"/>
                            <circle cx="6.47024" cy="17.4702" r="2.47019" transform="rotate(90 6.47024 17.4702)" fill="white"/>
                        </InputTip>
                    </InputWrapper>
                    <InputWrapper $ratio={ratio}>
                        <InputStyled $ratio={ratio} value={firstWord[4]} onChange={(e) => handleChange(e, 4)}/>
                        <InputTip $ratio={ratio} $draken={!!firstWord[4]} viewBox="0 0 24 24">
                            <mask id="path-1-inside-1_184_5631" fill="white">
                            <path d="M0 0H24V24H0V0Z"/>
                            </mask>
                            <path d="M24 24V25H25V24H24ZM23 0V24H25V0H23ZM24 23H0V25H24V23Z" fill="white" mask="url(#path-1-inside-1_184_5631)"/>
                        </InputTip>
                    </InputWrapper>
                    <InputWrapper $ratio={ratio}>
                        <InputStyled $ratio={ratio} value={firstWord[5]} onChange={(e) => handleChange(e, 5)}/>
                        <InputTip $ratio={ratio} $draken={!!firstWord[5]} fill="none"  viewBox="0 0 24 24">
                            <g clip-path="url(#clip0_2181_3322)">
                            <path d="M1 4L12.5 20L24 4" stroke="white"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_2181_3322">
                            <rect width="24" height="24" fill="white" transform="translate(0.5)"/>
                            </clipPath>
                            </defs>
                        </InputTip>
                    </InputWrapper> 
                    <InputWrapper $ratio={ratio}>
                        <InputStyled $ratio={ratio} value={firstWord[6]} onChange={(e) => handleChange(e, 6)}/>
                        <InputTip $ratio={ratio} $draken={!!firstWord[6]} fill="none"  viewBox="0 0 24 24">
                            <path d="M4 23.5L20 12L4 0.5" stroke="white"/>
                        </InputTip>
                    </InputWrapper>
                </WordWrapper>
            </Content>
        </Game>
    )
}