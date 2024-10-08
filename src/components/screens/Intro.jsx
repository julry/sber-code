import styled from "styled-components";
import intro from '../../assets/images/intro.png';
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { Button } from "../shared/Button";
import { useProgress } from "../../contexts/ProgressContext";
import { SCREENS } from "../../constants/screens";
import { Logo } from "../shared/Logo";
import { FlexWrapper } from "../shared/FlexWrapper";
import { IntroText } from "../shared/texts/IntroText";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: var(--spacing_x8) calc(var(--spacing_x5) + var(--spacing_x4)/2) 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Picture = styled.div`
    position: absolute;
    inset: 0;
    background: url(${intro}) no-repeat center 100% / cover;
`;

const BlockStyled = styled(FlexWrapper)`
    position: relative;
    z-index: 2;
    flex-grow: 1;
`;

const Light = styled.div`
    position: absolute;
    z-index: 1;
    top: ${({$ratio}) => $ratio * -231}px;
    width: ${({$ratio}) => $ratio * 316}px; 
    height: ${({$ratio}) => $ratio * 316}px;
    border-radius: 50%;
    left: 50%;
    transform: translateX(-50%);
    background: radial-gradient(50% 50% at 50% 50%, #14EAB0 0%, rgba(20, 234, 176, 0) 100%);
    filter: blur(46.3px);
`;

const Title = styled(IntroText)`
    width: ${({$ratio}) => $ratio * 239}px; 
    height: ${({$ratio}) => $ratio * 54}px;
    margin-bottom: ${({$ratio}) => $ratio * 38}px;
    flex-shrink: 0;
`;

const ButtonWrapper = styled(FlexWrapper)`
    margin-top: auto;
    width: 100%;
    flex-grow: 1;
    justify-content: flex-end;
    padding-bottom: calc(2 * var(--spacing_md));
`;

const Enter = styled(Button)`
    background: transparent;
    border: none;
    width: auto;
    padding: 0 1px 0 0;
    border-radius: 0;
    border-bottom: 1px solid white;
    margin-top: ${({$ratio}) => $ratio * 15}px;
`;

export const Intro = () => {
    const {next, currentWeek} = useProgress();
    const ratio = useSizeRatio();

    const handleReg = () => {
        if (currentWeek >= 5) {
            next(SCREENS.PLUG);

            return;
        }

        next(SCREENS.REG_1);
    };

    return (
        <Wrapper>
            <Logo />
            <Light $ratio={ratio}/>
            <Picture />
            <BlockStyled>
                <Title $ratio={ratio} />
                <p>
                    Здесь зашифрованы самые интересные факты о компании!
                    {'\n\n'}
                    Расшифровывай послания{'\n'}
                    и получай призы! А ещё ты получишь особенный ключ. {'\n'}
                    К чему? Узнаешь в процессе!
                </p>
                <ButtonWrapper>
                    <Button onClick={handleReg}>Регистрация</Button>
                    <Enter $ratio={ratio} onClick={() => next(SCREENS.LOGIN)}>Вход</Enter>
                </ButtonWrapper>
            </BlockStyled>
        </Wrapper>
    )
};
