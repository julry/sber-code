import styled from "styled-components";
import { IconButton } from "./Button";
import { useProgress } from "../../contexts/ProgressContext";
import { SCREENS } from "../../constants/screens";
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { Profile, Cap } from "./icons";

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 4;
`;

const IconButtonStyled = styled(IconButton)`
    position: relative;
    flex-shrink: 0;
    & + & {
        margin-left: calc(var(--spacing_x4) - var(--spacing_x1)/2);   
    }
`;

const Block = styled.div`
    display: flex;
`;

const ProgressWrapper = styled.div` 
    position: relative;
    border-radius: var(--border-radius-xl);
    height: ${({$ratio}) => $ratio * 14}px;
    background-color: var(--color-white);
    overflow: hidden;
    width: ${({$ratio}) => $ratio * 209}px;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2);
`;

const Progress = styled.div`
    position: absolute;
    top: 2px;
    bottom: 2px;
    left: 2px;
    width: calc((100% / ${({$amount}) => $amount}) * ${({$part}) => $part});
    border-radius: var(--border-radius-xl);
    overflow: hidden;
    z-index: 3;
    transition: width 0.3s;
    background: linear-gradient(267.34deg, #BC6BF4 13.16%, #8C96F6 41.95%, #58C8FF 69.41%, #14EAB0 101.74%), #FFFFFF;
`;

export const LobbyHeader = (props) => {
    const ratio = useSizeRatio();
    const { user, setModal, next, setUserInfo, currentScreen, passedWeeks} = useProgress();
    const lastWeek = passedWeeks.length + 1;

    const handleClick = () => {
        setUserInfo({lastPage: currentScreen});
        next(SCREENS.PROFILE);
    }

    return (
        <Wrapper {...props}>
            <ProgressWrapper $ratio={ratio}>
                <Progress $amount={4} $part={lastWeek}/>
            </ProgressWrapper>
            <Block>
                <IconButtonStyled onClick={() => setModal({type: 'points', visible: true})}>
                    <Cap />
                </IconButtonStyled>
                <IconButtonStyled onClick={() => setModal({type: 'profile', visible: true})}>
                    <Profile />
                </IconButtonStyled>
            </Block> 
        </Wrapper>  
    )
}