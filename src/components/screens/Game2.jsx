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

export const Game2 = () => {
    const { setModal } = useProgress();
    const [firstWord, setFirstWord] = useState(['', '', '', '', '', '']);
    const ratio = useSizeRatio();
    const week = weeks.find(({id}) => id === 2);

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
                week: 2, 
                text: 'Самое важное, что нужно знать — коллеги в Сбере поддержат тебя на всём рабочем пути!\n\n' +
                    'В компании у тебя будет наставник: он поможет выполнять цели, поставленные руководителем.  ' + 
                    'И, конечно, куда без крутого поддерживающего коллектива?\n\n'+
                    'У нас даже есть отдельный сервис заботы о сотрудниках — Хвалёнушка. Она всегда готова поддержать, ' +
                    'похвалить или выслушать, когда тебе грустно.'
            });

            return true;
        } else  setModal({visible: true, type: 'lose', week: 2, text: 'Ты был совсем близко, нужно всего лишь подумать над шифром ещё немного!'});
    }

    return (
        <Game 
            week={2} 
            buttonDisabled={firstWord.filter(f => f.length).length < 6}
            onAnswer={handleCheck}
        >
            <Content>
                <Text $ratio={ratio}>
                    Вводи по одной{'\n'}расшифрованной букве.
                </Text>
                <WordWrapper $ratio={ratio}>
                    <div>
                        <InputStyled $ratio={ratio} value={firstWord[0]} onChange={(e) => handleChange(e, 0, true)}/>
                        <Text $ratio={ratio} $draken={!!firstWord[0]}><b>Ь</b></Text>
                    </div>
                    <InputWrapper $ratio={ratio}>
                        <InputStyled $ratio={ratio} value={firstWord[1]} onChange={(e) => handleChange(e, 1, true)}/>
                        <Text $ratio={ratio} $draken={!!firstWord[1]}><b>В</b></Text>
                    </InputWrapper>
                    <InputWrapper $ratio={ratio}>
                        <InputStyled $ratio={ratio} value={firstWord[2]} onChange={(e) => handleChange(e, 2, true)}/>
                        <Text $ratio={ratio} $draken={!!firstWord[2]}><b>О</b></Text>
                    </InputWrapper>
                    <InputWrapper $ratio={ratio}>
                        <InputStyled $ratio={ratio} value={firstWord[3]} onChange={(e) => handleChange(e, 3)}/>
                        <Text $ratio={ratio} $draken={!!firstWord[3]}><b>Б</b></Text>
                    </InputWrapper>
                    <InputWrapper $ratio={ratio}>
                        <InputStyled $ratio={ratio} value={firstWord[4]} onChange={(e) => handleChange(e, 4)}/>
                        <Text $ratio={ratio} $draken={!!firstWord[4]}><b>Ю</b></Text>
                    </InputWrapper>
                    <InputWrapper $ratio={ratio}>
                        <InputStyled $ratio={ratio} value={firstWord[5]} onChange={(e) => handleChange(e, 5)}/>
                        <Text $ratio={ratio} $draken={!!firstWord[5]}><b>Л</b></Text>
                    </InputWrapper>
                </WordWrapper>
            </Content>
        </Game>
    )
}