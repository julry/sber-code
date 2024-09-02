import { useState } from "react";
import styled from "styled-components";
import { weeks } from "../../constants/weeks";
import { useProgress } from "../../contexts/ProgressContext";
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { Game } from "../shared/Game";
import { GameInput } from "../shared/GameInput";

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

    &:first-of-type {
        margin-top: ${({$ratio}) => $ratio * 30}px;
    }

    & + & {
        margin-top: ${({$ratio}) => $ratio * 10}px;
    }
`;

const InputWrapper = styled.div`
    margin-left: var(--spacing_small);
`;

export const Game1 = () => {
    const { setModal } = useProgress();
    const [firstWord, setFirstWord] = useState(['', '', '']);
    const [secondWord, setSecondWord] = useState(['', '', '', '', '', '']);
    const ratio = useSizeRatio();
    const week = weeks.find(({id}) => id === 1);

    const handleChange = (e, index, isFirst) => {
        const value = e.target.value.length > 1 ? e.target.value.slice(-1) : e.target.value; 
        const word = isFirst ? [...firstWord] : [...secondWord];
        if (value === ' ') return;

        word[index] = value.toUpperCase();

        if (isFirst) setFirstWord(word);
        else setSecondWord(word);
    };

    const handleCheck = () => {
        if (
            firstWord.join('').toUpperCase() === week.answer[0].toUpperCase() 
            && secondWord.join('').toUpperCase() === week.answer[1].toUpperCase()
        ) {
            setModal({
                visible: true, 
                type: 'win',
                week: 1, 
                text: 'Думаешь, совмещать работу и учёбу невозможно? На самом деле это реально! В Сбере ты можешь согласовать с руководителем удобный для себя график и работать от 20 часов в неделю.'
            });

        } else  setModal({visible: true, type: 'lose', week: 1, text: 'Кажется, что‑то не так!\nПопробуешь ещё раз?'});
    }

    return (
        <Game 
            week={1} 
            buttonDisabled={firstWord.filter(f => f.length).length < 3 || secondWord.filter(f => f.length).length < 6}
            onAnswer={handleCheck}
        >
            <Content>
                <Text $ratio={ratio}>
                    Вводи по одной{'\n'}расшифрованной букве.
                </Text>
                <WordWrapper $ratio={ratio}>
                    <div>
                        <InputStyled $ratio={ratio} value={firstWord[0]} onChange={(e) => handleChange(e, 0, true)}/>
                        <Text $ratio={ratio} $draken={!!firstWord[0]}><b>Е</b></Text>
                    </div>
                    <InputWrapper $ratio={ratio}>
                        <InputStyled $ratio={ratio} value={firstWord[1]} onChange={(e) => handleChange(e, 1, true)}/>
                        <Text $ratio={ratio} $draken={!!firstWord[1]}><b>Ф</b></Text>
                    </InputWrapper>
                    <InputWrapper $ratio={ratio}>
                        <InputStyled $ratio={ratio} value={firstWord[2]} onChange={(e) => handleChange(e, 2, true)}/>
                        <Text $ratio={ratio} $draken={!!firstWord[2]}><b>И</b></Text>
                    </InputWrapper>
                </WordWrapper>
                <WordWrapper $ratio={ratio}>
                    <div>
                        <InputStyled  $ratio={ratio} value={secondWord[0]} onChange={(e) => handleChange(e, 0, false)}/>
                        <Text $ratio={ratio} $draken={!!secondWord[0]}><b>Е</b></Text>
                    </div>
                    <InputWrapper $ratio={ratio}>
                        <InputStyled $ratio={ratio} value={secondWord[1]} onChange={(e) => handleChange(e, 1, false)}/>
                        <Text $ratio={ratio} $draken={!!secondWord[1]}><b>П</b></Text>
                    </InputWrapper>
                    <InputWrapper $ratio={ratio}>
                        <InputStyled $ratio={ratio} value={secondWord[2]} onChange={(e) => handleChange(e, 2, false)}/>
                        <Text $ratio={ratio} $draken={!!secondWord[2]}><b>З</b></Text>
                    </InputWrapper>
                    <InputWrapper $ratio={ratio}>
                        <InputStyled $ratio={ratio} value={secondWord[3]} onChange={(e) => handleChange(e, 3, false)}/>
                        <Text $ratio={ratio} $draken={!!secondWord[3]}><b>Ф</b></Text>
                    </InputWrapper>
                    <InputWrapper $ratio={ratio}>
                        <InputStyled $ratio={ratio} value={secondWord[4]} onChange={(e) => handleChange(e, 4, false)}/>
                        <Text $ratio={ratio} $draken={!!secondWord[4]}><b>Х</b></Text>
                    </InputWrapper>
                    <InputWrapper $ratio={ratio}>
                        <InputStyled $ratio={ratio} value={secondWord[5]} onChange={(e) => handleChange(e, 5, false)}/>
                        <Text $ratio={ratio} $draken={!!secondWord[5]}><b>З</b></Text>
                    </InputWrapper>
                </WordWrapper>
            </Content>
        </Game>
    )
}