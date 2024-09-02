import { useEffect } from "react";
import styled from "styled-components";
import game from '../../assets/images/game.png';
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
    const { user, setModal } = useProgress();
    const ratio = useSizeRatio();

    const handleClickTip = () => {
        setModal({visible: true, type: 'tips', week});
    }

    const handleClickInfo = () => {
        setModal({visible: true, type: 'tipsInfo'});
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
            <Button disabled={buttonDisabled} onClick={onAnswer}>Ввести</Button>
        </Wrapper>
    )
}