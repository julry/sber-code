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
    padding: calc(var(--spacing_x5) * 1.8) 0 var(--spacing_x5);
`;

const InputStyled = styled(GameInput)`
    margin-bottom: ${({$ratio}) => $ratio * 10}px;
`;

const WordWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
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

const TableStyled = styled.table`
    border-collapse: collapse;

    & td {
        width: 28px;
        height: 28px;
        border: 1px solid white;
        font-size: 18px;
        text-align: center;
    }
`;

export const Game3 = () => {
    const { setModal } = useProgress();
    const [firstWord, setFirstWord] = useState(['', '', '', '', '', '']);
    const ratio = useSizeRatio();
    const week = weeks.find(({id}) => id === 3);

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
                week: 3, 
                text: `В Сбере точно знают, что такое\nwork—life balance! ` + 
                'Ты можешь посещать спортзал, корпоративные командные тренировки и, конечно, использовать ' + 
                'все возможности нашего офиса.'
            });

            return true;
        } else  setModal({
            visible: true, 
            type: 'lose', 
            week: 3, 
            text: 'Много цифр, много букв, запутаться действительно очень легко. Но ты точно сможешь разгадать этот шифр!'
        });
    }

    return (
        <Game 
            week={3} 
            buttonDisabled={firstWord.filter(f => f.length).length < 6}
            onAnswer={handleCheck}
        >
            <Content>
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
                </WordWrapper>
                <TableWrapper>
                <TableStyled cellSpacing={0}>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>4</td>
                            <td>5</td>
                            <td>6</td>
                            <td>7</td>
                            <td>8</td>
                            <td>9</td>
                            <td>10</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>С</td>
                            <td>Ч</td>
                            <td>А</td>
                            <td>С</td>
                            <td>Т</td>
                            <td>Ь</td>
                            <td>Е</td>
                            <td>Р</td>
                            <td>А</td>
                            <td>З</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>В</td>
                            <td>И</td>
                            <td>Т</td>
                            <td>И</td>
                            <td>Е</td>
                            <td>У</td>
                            <td>С</td>
                            <td>П</td>
                            <td>Е</td>
                            <td>Х</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>П</td>
                            <td>О</td>
                            <td>Б</td>
                            <td>Е</td>
                            <td>Д</td>
                            <td>А</td>
                            <td>П</td>
                            <td>У</td>
                            <td>Т</td>
                            <td>Ь</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>З</td>
                            <td>Н</td>
                            <td>А</td>
                            <td>Н</td>
                            <td>И</td>
                            <td>Я</td>
                            <td>Д</td>
                            <td>О</td>
                            <td>С</td>
                            <td>Т</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>И</td>
                            <td>Ж</td>
                            <td>Е</td>
                            <td>Н</td>
                            <td>И</td>
                            <td>Я</td>
                            <td>У</td>
                            <td>В</td>
                            <td>Е</td>
                            <td>Р</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>Е</td>
                            <td>Н</td>
                            <td>Н</td>
                            <td>О</td>
                            <td>С</td>
                            <td>Т</td>
                            <td>Ь</td>
                            <td>П</td>
                            <td>О</td>
                            <td>Д</td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td>Д</td>
                            <td>Е</td>
                            <td>Р</td>
                            <td>Ж</td>
                            <td>К</td>
                            <td>А</td>
                            <td>П</td>
                            <td>Р</td>
                            <td>О</td>
                            <td>Г</td>
                        </tr>
                        <tr>
                            <td>8</td>
                            <td>Р</td>
                            <td>Е</td>
                            <td>С</td>
                            <td>С</td>
                            <td>У</td>
                            <td>Д</td>
                            <td>А</td>
                            <td>Ч</td>
                            <td>А</td>
                            <td>Т</td>
                        </tr>
                        <tr>
                            <td>9</td>
                            <td>А</td>
                            <td>Л</td>
                            <td>А</td>
                            <td>Н</td>
                            <td>Т</td>
                            <td>Р</td>
                            <td>Е</td>
                            <td>А</td>
                            <td>Л</td>
                            <td>И</td>
                        </tr>
                        <tr>
                            <td>10</td>
                            <td>З</td>
                            <td>А</td>
                            <td>Ц</td>
                            <td>И</td>
                            <td>Я</td>
                            <td>—</td>
                            <td>С</td>
                            <td>Б</td>
                            <td>Е</td>
                            <td>Р</td>
                        </tr>
                    </tbody>
                </TableStyled>
                </TableWrapper>
            </Content>
        </Game>
    )
}