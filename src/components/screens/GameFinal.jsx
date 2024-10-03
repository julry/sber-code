import styled from "styled-components";
import { FlexWrapper } from "../shared/FlexWrapper";
import longLvlBg from '../../assets/images/longLvlBg.png';
import { useProgress } from "../../contexts/ProgressContext";
import { Button } from "../shared/Button";
import { GameHeader } from "../shared/GameHeader";
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { useState } from "react";
import { TIPS_TO_POINTS } from "../../constants/tipsToPoints";
import test from '../../assets/images/tip22.png';

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

const fullLetters = [
    {
        id: 0,
        l: 'й',
        correctPosition: [{w: 1, l: [8]}],
    },
    {
        id: 1,
        l: 'в',
        correctPosition: [{w: 2, l: [7]}],
    },
    {
        id: 2,
        l: 'ы',
        correctPosition: [{w: 0, l: [1]}],
    },
    {
        id: 3,
        l: 'н',
        correctPosition: [{w: 1, l: [0]}],
    },
    {
        id: 4,
        l: 'щ',
        correctPosition: [{w: 1, l: [6]}],
    },
    {
        id: 5,
        l: 'о',
        correctPosition: [{w: 1, l: [4]}],
    },

    {
        id: 6,
        l: 'т',
        correctPosition: [{w: 2, l:[2, 5]}, {w: 0, l: [0]}, {w: 1, l: [3]}],
    },
    {
        id: 7,
        l: 'е',
        correctPosition: [{w: 2, l: [1, 3]}],
    },
    {
        id: 8,
        l: 'а',
        correctPosition: [{w: 1, l: [1]}],
    },
    {
        id: 9,
        l: 'к',        
        correctPosition: [{w: 2, l: [4]}],
    },
    {
        id: 10,
        l: 'т',
        correctPosition: [{w: 0, l: [0]}, {w: 1, l: [3]}, {w: 2, l:[2, 5]}],
    },
    {
        id: 11,
        l: 'т',
        correctPosition: [{w: 2, l:[2, 5]}, {w: 1, l: [3]}, {w: 0, l: [0]}],
    },
    {
        id: 12,
        l: 'и',
        correctPosition: [{w: 1, l: [7]}, {w: 2, l:[6]}],
    },
    {
        id: 13,
        l: 'с',
        correctPosition: [{w: 1, l: [2]}],
    },
    {
        id: 14,
        l: 'д',
        correctPosition: [{w: 2, l: [0]}],
    },
    {
        id: 15,
        l: 'т',
        correctPosition: [{w: 1, l: [3]}, {w: 0, l: [0]}, {w: 2, l:[2, 5]}],
    },
    {
        id: 16,
        l: 'я',
        correctPosition: [{w: 1, l: [5]}],
    },
    {
        id: 17,
        l: 'и',
        correctPosition: [{w: 2, l:[6]}, {w: 1, l: [7]}],
    },
    {
        id: 18,
        l: 'е',
        correctPosition: [{w: 2, l: [3, 1]}],
    },
];


export const GameFinal = () => {
    const ratio = useSizeRatio();
    const { setModal, next, updateUser, setUserInfo, setPoints, user, vipPoints, points, weekPoints, setVipPoints, setWeekPoints } = useProgress();
    const [saving, setSaving] = useState(false);
    const [selected, setSelected] = useState([0, 0]);
    const [phrase, setPhrase] = useState([['', ''], ['', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '']]);
    const [letters, setLetters] = useState(fullLetters);
    const [tipsLetters, setTipLetters] = useState([]);
    const answer = ['Ты', 'настоящий', 'детектив'];
  
    const getRandomIndex = () => Math.floor(0 + Math.random() * letters.length);

    const handleClickTip = async () => {
        if (saving) return;
        if (user.weekTips[5] === 3) return;
        if (letters.length < 1) return;

        setSaving(true);

        const index1 = getRandomIndex();
        let index2 = getRandomIndex();
        
        if (index1 === index2) {
            if (index1 === (letters.length - 1)) index2 = 0;
            else index2 = index1 + 1;
        }

        const letter1 = letters[index1];
        const letter2 = letters[index2];
        
        let w1;
        let w2;
        let l1;
        let l2;

        letter1.correctPosition.forEach(({w, l}) => {
            if (!!w1 && !!l1) return;
            l.forEach((letter) => {
                if (!!w1 && !!l1) return;
                if (!phrase[w][letter].length) {
                    w1 = w;
                    l1 = letter;
                }
            })
        })

        letter2.correctPosition.forEach(({w, l}) => {
            if (!!w2 && !!l2) return;
            l.forEach((letter) => {
                if (!!w2 && !!l2) return;
                if (!phrase[w][letter]?.length) {
                    w2 = w;
                    l2 = letter;
                }
            })
        });

        const newPhrase = [...phrase];

        newPhrase[w1][l1] = letter1.l;
        newPhrase[w2][l2] = letter2.l;

        setTipLetters(prev => [...prev, {w: w1, l: l1}, {w: w2, l: l2}]);
        setLetters(prev => prev.filter(prevLetter => prevLetter.id !== letter1.id && prevLetter.id !== letter2.id));
        setPhrase(newPhrase);
        await updateUser({weekTips: Object.values({...user.weekTips, 5: (user.weekTips[5] ?? 0) + 1}).join(',')});
        setUserInfo({weekTips: {...user.weekTips, 5:  (user.weekTips[5] ?? 0) + 1}});
        setSaving(false);
    }

    const handleLetterClick = (letter, index) => {
        if (selected.length < 2) return;

        const [wordIndex, selectedIndex] = selected;

        if (!phrase[wordIndex] || phrase[wordIndex][selectedIndex].length) return;
        let nextX = wordIndex; 
        let nextY = selectedIndex;

        const newPhrase = [...phrase];

        const word = [...phrase[wordIndex]];
        if (selectedIndex > (word.length - 1)) return;
        if (selectedIndex + 1 === word.length) {
            if (wordIndex !== phrase.length - 1) {
                nextX = wordIndex + 1;
                nextY = 0
            }
        } else {
            nextX = wordIndex;
            nextY = selectedIndex + 1;
        }

        word[selectedIndex] = letter; 
        newPhrase[wordIndex] = word;

        setPhrase(newPhrase);
        setSelected([nextX, nextY]);
        setLetters(prev => prev.filter(({id}) => id !== index));
    }

    const handleLetterDelete = (wordIndex, selectedIndex) => {
        const word = [...phrase[wordIndex]];
        const letter = word[selectedIndex];
        word[selectedIndex] = '';
        const returnedLetter = fullLetters.find(({l, id}) => l === letter && !letters.find(({id: newId}) => newId === id));

        setLetters(prev => prev.find(({id}) => id === returnedLetter.id) ? prev : [...prev, returnedLetter]);
    }

    const handleFinish = () => {
        next();
    };

    const handleCheck = () => {
        if (saving) return;
        if (phrase.every((word, ind) => word.join('').toUpperCase() === answer[ind].toUpperCase())) {
            const {coins, tickets} = TIPS_TO_POINTS[user.weekTips[5] ?? 0] ?? {};
            setSaving(true);

            const data = {
                isFinalFinished: true
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
            setUserInfo({isFinalFinished: true});
            setModal({visible: true, type: 'postLevel', week: '4_1', btnText: 'Финал', onClick: handleFinish});
            setSaving(false);
        }
    }
    
    return (
        <Wrapper $ratio={ratio}>
           <GameHeader onClickTip={handleClickTip} week={5}/>
           {phrase.map((word, wordInd) => (
                <AnswerLine key={`word_${wordInd}_${phrase.length}`}>
                {word.map((l, ind) => (
                    <PickedLetter 
                        key={`picked${wordInd}_${ind}`} 
                        $active={selected[0] === wordInd && selected[1] === ind && letters.length} 
                        $ratio={ratio} 
                        onClick={() => setSelected([wordInd, ind])}
                    >
                        {l}
                    </PickedLetter>
                ))}
                {wordInd === 0 && (<Separator $ratio={ratio}>—</Separator>)}
           </AnswerLine>
           ))}
           <ButtonStyled 
                onClick={handleCheck}
                disabled={!phrase.every((word) => word.every(f => !!f))}
            >
                Ввести
            </ButtonStyled>
           <LettersWrapper>
                {letters.map(({l, id}) => (
                    <Letter key={id} $ratio={ratio} onClick={() => handleLetterClick(l, id)}>{l}</Letter>
                ))}
           </LettersWrapper>
        </Wrapper>
    )
}