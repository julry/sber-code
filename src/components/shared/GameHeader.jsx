import styled from "styled-components";
import { IconButton } from "./Button";
import { BackButton } from "./BackButton";
import { useProgress } from "../../contexts/ProgressContext";
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { Info } from "./icons";
import { Bulb } from "./icons/Bulb";
import { TipButton } from "./TipButton";

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


export const GameHeader = ({ onClickTip, week }) => {
    const ratio = useSizeRatio();
    const { setModal, user} = useProgress();

    const handleClickInfo = () => {
        setModal({visible: true, type: 'tipsInfo'});
    }

    return (
            <Header>
                <BackButton onClick={() => setModal({visible: true, type: 'exit'})}/>
                <FlexBlock $ratio={ratio}>
                    <TipButton $ratio={ratio} onClick={onClickTip}>
                        <Bulb />
                        <p>{Math.max(3 - (user.weekTips[week] ?? 0), 0)}/3</p>
                    </TipButton>
                    <IconButton onClick={handleClickInfo}>
                        <Info />
                    </IconButton>
                </FlexBlock>
            </Header>
    )
};
