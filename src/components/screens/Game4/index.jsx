import { useState } from "react";
import styled from "styled-components";
import { weeks } from "../../constants/weeks";
import { useProgress } from "../../contexts/ProgressContext";
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { Game } from "../shared/Game";
import { GameInput } from "../shared/GameInput";
import { FirstItem } from "./FirstItem";
import { SecondItem } from "./SecondItem";
import { ThirdItem } from "./ThirdItem";
import { FourthItem } from "./FourthItem";
import { FifthItem } from "./FifthItem";

const Text = styled.p`
    font-size: ${({$ratio}) => $ratio * 22}px;
    opacity: ${({$draken}) => $draken  ? 0.2 : 1};
    transition: opacity 0.3s;
`;

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
    margin-bottom: ${({$ratio}) => $ratio * 20}px;
`;

const InputWrapper = styled.div`
    margin-left: var(--spacing_small);
`;

const TableWrapper = styled.div`
    overflow: hidden;
    border-radius: 5px;
    background-color: rgba(36, 21, 47, 0.9);
    box-shadow: 0px 0px 0px 1px #FFFFFF inset;
`;

const Line = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    
    & + & { 
        margin-top: var(--spacing_x2);
    }
`;

export const Game4 = () => {
    const { setModal } = useProgress();
    const [firstWord, setFirstWord] = useState(['', '', '', '', '', '', '']);
    const ratio = useSizeRatio();
    const week = weeks.find(({id}) => id === 4);

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
                    <FirstItem />
                    <SecondItem />
                    <ThirdItem />
                </Line>
                <Line>
                    <FourthItem />
                    <FifthItem />
                </Line>
                <WordWrapper $ratio={ratio}>
                    <div>
                        <InputStyled $ratio={ratio} value={firstWord[0]} onChange={(e) => handleChange(e, 0, true)}/>
                        <Text $ratio={ratio} $draken={!!firstWord[0]}><b>3/3</b></Text>
                    </div>
                    <InputWrapper $ratio={ratio}>
                        <InputStyled $ratio={ratio} value={firstWord[1]} onChange={(e) => handleChange(e, 1, true)}/>
                        <Text $ratio={ratio} $draken={!!firstWord[1]}><b>1/3</b></Text>
                    </InputWrapper>
                    <InputWrapper $ratio={ratio}>
                        <InputStyled $ratio={ratio} value={firstWord[2]} onChange={(e) => handleChange(e, 2, true)}/>
                        <Text $ratio={ratio} $draken={!!firstWord[2]}><b>9/2</b></Text>
                    </InputWrapper>
                    <InputWrapper $ratio={ratio}>
                        <InputStyled $ratio={ratio} value={firstWord[3]} onChange={(e) => handleChange(e, 3)}/>
                        <Text $ratio={ratio} $draken={!!firstWord[3]}><b>8/7</b></Text>
                    </InputWrapper>
                    <InputWrapper $ratio={ratio}>
                        <InputStyled $ratio={ratio} value={firstWord[4]} onChange={(e) => handleChange(e, 4)}/>
                        <Text $ratio={ratio} $draken={!!firstWord[4]}><b>4/2</b></Text>
                    </InputWrapper>
                    <InputWrapper $ratio={ratio}>
                        <InputStyled $ratio={ratio} value={firstWord[5]} onChange={(e) => handleChange(e, 5)}/>
                        <Text $ratio={ratio} $draken={!!firstWord[5]}><b>1/1</b></Text>
                    </InputWrapper> 
                    <InputWrapper $ratio={ratio}>
                        <InputStyled $ratio={ratio} value={firstWord[5]} onChange={(e) => handleChange(e, 6)}/>
                        <Text $ratio={ratio} $draken={!!firstWord[5]}><b>1/1</b></Text>
                    </InputWrapper>
                </WordWrapper>
            </Content>
        </Game>
    )
}