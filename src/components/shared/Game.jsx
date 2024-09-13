import styled from "styled-components";
import game from '../../assets/images/game.png';
import { TIPS_TO_POINTS } from "../../constants/tipsToPoints";
import { useProgress } from "../../contexts/ProgressContext";
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { BackButton } from "./BackButton";
import { Button, IconButton } from "./Button";
import { FlexWrapper } from "./FlexWrapper";
import { Info } from "./icons";
import { Bulb } from "./icons/Bulb";
import { TipButton } from "./TipButton";

const Wrapper = styled(FlexWrapper)`
    width: 100%;
    position: relative;
    height: 100%;
    background: url(${game}) center center no-repeat;
    background-size: cover;
    padding: ${({$ratio}) => $ratio * 62}px ${({$ratio}) => $ratio * 23}px ${({$ratio}) => $ratio * 23}px;
`;

const Header = styled.div`
    position: absolute;
    top: var(--spacing_x5);
    left: var(--spacing_x5);
    right: var(--spacing_x5);
    display: flex;
    align-items: center;
    justify-content: space-between;

`;

const FlexBlock = styled.div`
    display: flex;
    align-items: center;

    & button + button {
        margin-left: var(--spacing_x3);
    }
`;

export const Game = ({ onAnswer, week, buttonDisabled, children }) => {
    const { 
        user, setModal, currentWeek, passedWeeks, setPassedWeeks,
        weekPoints, points, vipPoints, 
        setWeekPoints, setPoints, setVipPoints, updateUser 
    } = useProgress();
    const ratio = useSizeRatio();

    const handleClickTip = () => {
        setModal({visible: true, type: 'tips', week});
    }

    const handleClickInfo = () => {
        setModal({visible: true, type: 'tipsInfo'});
    }


    const handleAnswer = () => {
        const isCorrect = onAnswer();

        if (!isCorrect) return;

        const {coins, tickets} = TIPS_TO_POINTS[user.weekTips[week]] ?? {};

        const data = {
            passedWeeks: (passedWeeks.includes(week) ? passedWeeks : [...passedWeeks, week]).join(',')
        };

        
        if (user.isVip) {
            if (week === currentWeek) {
                data[`week${currentWeek}Points`] = weekPoints + coins;
                setWeekPoints(prev => prev + coins);
            }

            data.targetPoints = vipPoints + tickets;
            setVipPoints(prev => prev + tickets);
        } else {
            data.points = points + coins;
            setPoints(prev => prev + coins);
        }

        setPassedWeeks(prev => {
            const weeks = prev.includes(week) ? prev : [...prev, week];
            return weeks;
        });
        updateUser(data);
    }

    return (
        <Wrapper $ratio={ratio}>
            <Header>
                <BackButton onClick={() => setModal({visible: true, type: 'exit'})}/>
                <FlexBlock $ratio={ratio}>
                    <TipButton $ratio={ratio} onClick={handleClickTip}>
                        <Bulb />
                        <p>{3 - user.weekTips[week] >= 0 ? 3 - user.weekTips[week] : 0}/3</p>
                    </TipButton>
                    <IconButton onClick={handleClickInfo}>
                        <Info />
                    </IconButton>
                </FlexBlock>
            </Header>
            {children}
            <Button disabled={buttonDisabled} onClick={handleAnswer}>Ввести</Button>
        </Wrapper>
    )
}