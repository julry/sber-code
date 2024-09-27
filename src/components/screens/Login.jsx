import styled from "styled-components";
import intro from '../../assets/images/intro.png';
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { Button } from "../shared/Button";
import { useProgress } from "../../contexts/ProgressContext";
import { SCREENS } from "../../constants/screens";
import { Logo } from "../shared/Logo";
import { FlexWrapper } from "../shared/FlexWrapper";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Input } from "../shared/Input";
import { LoginText } from "../shared/texts/LoginText";
import { BackButton } from "../shared/BackButton";
import { emailRegExp } from "../../constants/regexp";
import { reachMetrikaGoal } from "../../utils/reachMetrikaGoal";

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

const Title = styled(LoginText)`
    width: ${({$ratio}) => $ratio * 266}px; 
    height: ${({$ratio}) => $ratio * 53}px;
    margin-bottom: ${({$ratio}) => $ratio * 35}px;
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
    padding: 0 1px 0 ${({$ratio}) => $ratio * 3}px;
    border-radius: 0;
    border-bottom: 1px solid white;
    margin-top: ${({$ratio}) => $ratio * 15}px;
`;

const Text = styled.p`
    margin-bottom: ${({$ratio}) => $ratio * 28}px;
`;

const BackStyled = styled(BackButton)`
    position: absolute;
    top: var(--spacing_x5);
    left: var(--spacing_x5);
`;

const IncorrectText = styled.p`
    width: ${({$ratio}) => $ratio * 274}px;
    font-size: var(--font_sm);
    margin-top: var(--spacing_small);
`;

export const Login = () => {
    const [isIncorrectEmail, setIsIncorrectEmail] = useState(false);
    const [email, setEmail] = useState('');
    const [isSending, setIsSending] = useState(false);
    const { next, getUserInfo, currentWeek } = useProgress();
    const ratio = useSizeRatio();

    const handleNext = async () => {
        if (isSending) return;

        if (!!email && !email.match(emailRegExp)) {
            setIsIncorrectEmail(true);
            return;
        }
        setIsSending(true);
        const info = await getUserInfo(email.toLowerCase().trim());
        setIsSending(false);

        if (info?.isError) {
            setIsIncorrectEmail(true);
            return;
        }

        const { userInfo } = info;

        if (currentWeek > 1 && userInfo.seenInfo) {
            reachMetrikaGoal(`${userInfo.isVip ? '' : 'non'}target_lobby${currentWeek}`);    
        }

        next(userInfo.seenInfo ? SCREENS.LOBBY : SCREENS.START);
    };

    return (
        <Wrapper>
            <BackStyled onClick={() => next(SCREENS.INTRO)} />
            <Logo />
            <Light $ratio={ratio}/>
            <Picture />
            <BlockStyled>
                <Title $ratio={ratio}/>
                <Text $ratio={ratio}>
                    Введи свою почту, чтобы попасть туда, где закончил в прошлый раз
                </Text>
                <Input placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                {isIncorrectEmail && (<IncorrectText $ratio={ratio}>
                    Кажется, такой почты нет. Попробуй ввести ещё раз или зарегистрируйся, чтобы начать разгадывать шифры.
                </IncorrectText>)}
                <ButtonWrapper>
                    <Button onClick={handleNext}>Вход</Button>
                    <AnimatePresence>
                        {isIncorrectEmail && (
                            <Enter $ratio={ratio} onClick={() => next(SCREENS.REG_1)}>Регистрация</Enter>
                        )}
                    </AnimatePresence>
                </ButtonWrapper>
            </BlockStyled>
        </Wrapper>
    )
};
