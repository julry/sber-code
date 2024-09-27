import styled from "styled-components";
import { FlexWrapper } from "../shared/FlexWrapper";
import longLvlBg from '../../assets/images/longLvlBg.png';
import { useProgress } from "../../contexts/ProgressContext";
import { Button } from "../shared/Button";
import { GameHeader } from "../shared/GameHeader";
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { useState } from "react";
import { TIPS_TO_POINTS } from "../../constants/tipsToPoints";

const Wrapper = styled(FlexWrapper)`
    width: 100%;
    position: relative;
    height: 100%;
    background: url(${longLvlBg}) 0% 100% no-repeat;
    background-size: cover;
    padding: ${({$ratio}) => $ratio * 80}px ${({$ratio}) => $ratio * 23}px ${({$ratio}) => $ratio * 23}px;
`;

const ButtonStyled = styled(Button)`
    margin: var(--spacing_x5) 0 var(--spacing_small);
`;

const LettersWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    align-items: center;
`;

const AnswerLine = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    & + & {
        margin-top: var(--spacing_x1);
    }
`;

const Letter = styled.button`
    outline: none;
    display: flex;
    cursor: pointer;
    font-weight: 700;
    border: none;
    align-items: center;
    justify-content: center;
    width: ${({$ratio}) => $ratio * 38}px;
    font-size: ${({$ratio}) => $ratio * 28}px;
    height: ${({$ratio}) => $ratio * 50}px;
    background: rgba(255, 255, 255, 0.2);
    font-weight: 600;
    box-shadow: inset 0 0 0 1px #FFFFFF, 0 0 0 ${({$ratio}) => $ratio * 3}px rgba(255, 255, 255, 0.2);
    border-radius: ${({$ratio}) => $ratio * 8}px;
    margin-top: ${({$ratio}) => $ratio * 10}px;
    margin-left: ${({$ratio}) => $ratio * 10}px;
    color: white;
    text-transform: uppercase;

    &:first-child {
        margin-left: 0;
    }
    &:nth-child(8) {
        margin-left: 0;
    }
    &:nth-child(15) {
        margin-left: 0;
    }
`;

const PickedLetter = styled(Letter)`
    width: ${({$ratio}) => $ratio * 30}px;
    height: ${({$ratio}) => $ratio * 48}px;
    font-size: ${({$ratio}) => $ratio * 24}px;
    transition: background 0.3s;

    ${({$active}) => $active ? 'background: rgba(255,255,255,0.4)' : ''};
    
    & + & {
        margin-left: ${({$ratio}) => $ratio * 7}px;
    }
`;

const Separator = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: visible;
    width: ${({$ratio}) => $ratio * 28}px;
    height: ${({$ratio}) => $ratio * 48}px;
    font-size: ${({$ratio}) => $ratio * 34}px;
    margin-left: ${({$ratio}) => $ratio * 10}px;
`;

const initalLetters = ['й', 'в', 'ы', 'н', 'щ', 'о', 'т', 'е', 'а', 'к', 'т', 'т', 'и', 'с', 'д', 'т', 'я', 'и', 'е'];


export const GameFinal = () => {
    const ratio = useSizeRatio();
    const { setModal, next, updateUser, setUserInfo, setPoints, user, vipPoints, points, weekPoints, setVipPoints, setWeekPoints } = useProgress();
    const [saving, setSaving] = useState(false);
    const [selected, setSelected] = useState([0, 0]);
    const [firstWord, setFirstWord] = useState(['', '']);
    const [secondWord, setSecondWord] = useState(['', '', '', '', '', '', '', '', '']);
    const [thirdWord, setThirdWord] = useState(['', '', '', '', '', '', '', '']);
    const [letters, setLetters] = useState(initalLetters);
    const answer1 = 'Ты';
    const answer2 = 'настоящий';
    const answer3 = 'детектив';

    const handleClickTip = () => {

    }

    const handleLetterClick = (letter, index) => {
        let nextX; let nextY;
        if (selected.length < 2) return;

        if (selected[0] === 0) {
            const index = selected[1];

            if (index > (firstWord.length - 1)) return;
            if (index + 1 === firstWord.length) {
                nextX = 1;
                nextY = 0;
            } else {
                nextX = 0;
                nextY = 1;
            }
            const word = [...firstWord];
            word[index] = letter; 
            setFirstWord(word)
        }

        if (selected[0] === 1) {
            const index = selected[1];

            if (index > (secondWord.length - 1)) return;
            if (index + 1 === secondWord.length) {
                nextX = 2;
                nextY = 0;
            } else {
                nextX = 1;
                nextY = index + 1;
            }
            const word = [...secondWord];
            word[index] = letter; 
            setSecondWord(word)
        }

        if (selected[0] === 2) {
            const index = selected[1];

            if (index > (thirdWord.length - 1)) return;
            if (index !== (thirdWord.length - 1)) {
                nextX = 2;
                nextY = index + 1;
            }
            const word = [...thirdWord];
            word[index] = letter; 
            setThirdWord(word)
        }

        setSelected([nextX, nextY]);
        setLetters(prev => prev.filter((_, ind) => ind !== index));
    }

    const handleFinish = async () => {
        if (saving) return;
        setSaving(true);
        await updateUser({isFinalFinished: true});
        setSaving(false);
        next();
    };

    const handleCheck = () => {
        const isFirst = firstWord.join('').toUpperCase() === answer1.toUpperCase();
        const isSecond = secondWord.join('').toUpperCase() === answer2.toUpperCase();
        const isThird = thirdWord.join('').toUpperCase() === answer3.toUpperCase();

        if (isFirst && isSecond && isThird) {
            const {coins, tickets} = TIPS_TO_POINTS[user.weekTips[5]] ?? {};

            const data = {
                isFinishFinal: true
            };
            // reachMetrikaGoal(`${user.isVip ? '' : 'non'}target_week${week}done`);    
            if (user.isVip) {
                data[`week4Points`] = weekPoints + coins;
                setWeekPoints(prev => prev + coins);
                data.targetPoints = vipPoints + tickets;
                setVipPoints(prev => prev + tickets);
            } else {
                data.points = points + coins;
                setPoints(prev => prev + coins);
            }
            updateUser(data);
            setUserInfo({isFinishFinal: true});
            setModal({visible: true, type: 'postLevel', week: '4_1', btnText: 'Финал', onClick: handleFinish});
        }
    }
    
    return (
        <Wrapper $ratio={ratio}>
           <GameHeader onClickTip={handleClickTip} week={5}/>
           <AnswerLine>
                {firstWord.map((l, ind) => (
                    <PickedLetter 
                        key={`picked1${ind}`} 
                        $active={selected[0] === 0 && selected[1] === ind} 
                        $ratio={ratio} 
                        onClick={() => setSelected([0, ind])}
                    >
                        {l}
                    </PickedLetter>
                ))}
                <Separator $ratio={ratio}>—</Separator>
           </AnswerLine>
           <AnswerLine>
                {secondWord.map((l, ind) => (
                    <PickedLetter 
                        key={`picked2${ind}`}
                        $active={selected[0] === 1 && selected[1] === ind} 
                        $ratio={ratio} 
                        onClick={() => setSelected([1, ind])}
                    >{l}</PickedLetter>
                ))}
           </AnswerLine>
           <AnswerLine>
                {thirdWord.map((l, ind) => (
                    <PickedLetter 
                        $ratio={ratio} 
                        key={`picked3${ind}`}
                        $active={selected[0] === 2 && selected[1] === ind} 
                        onClick={() => setSelected([2, ind])}
                    >
                        {l}
                    </PickedLetter>
                ))}
           </AnswerLine>
           <ButtonStyled 
                onClick={handleCheck}
                // disabled={!(firstWord.every(f => !!f) && secondWord.every(f => !!f) && thirdWord.every(f => !!f))}
            >
                Ввести
            </ButtonStyled>
           <LettersWrapper>
                {letters.map((l, ind) => (
                    <Letter key={l + ind} $ratio={ratio} onClick={() => handleLetterClick(l, ind)}>{l}</Letter>
                ))}
           </LettersWrapper>
           
        </Wrapper>
    )
}