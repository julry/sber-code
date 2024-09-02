import { useState } from "react";
import styled from "styled-components";
import { useProgress } from "../../contexts/ProgressContext";
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { Button } from "../shared/Button";
import { FlexWrapper } from "../shared/FlexWrapper";
import { Rules1Text } from "../shared/texts/Rules1Text";
import start from '../../assets/images/start2.png';
import { Rules2Text } from "../shared/texts/Rules2Text";
import { SCREENS } from "../../constants/screens";
import { BackButton } from "../shared/BackButton";

const Wrapper = styled(FlexWrapper)`
    padding: ${({$ratio}) => $ratio * 50}px ${({$ratio}) => $ratio * 23}px ${({$ratio}) => $ratio * 40}px;
    text-align: left;
    background: url(${start}) no-repeat center 100% / cover;
`;

const Title = styled(Rules2Text)`
    width: ${({$ratio}) => $ratio * 229}px; 
    height: ${({$ratio}) => $ratio * 52}px;
    margin-bottom: ${({$ratio}) => $ratio * 16}px;
    flex-shrink: 0;
`;

const Text = styled.p`
    font-size: var(--font_md);
`;

const ButtonStyled = styled(Button)`
    margin-top: auto;
`;

const Info = styled.div`
    margin-top: var(--spacing_x5);
    width: 100%;
`;

const TipBlock = styled.div`
    padding: var(--spacing_small);
    font-weight: 600;
    margin-right: var(--spacing_small);
    border-radius: var(--border-radius-xl);
    border: 1px solid #FFFFFF;
    background: rgba(255, 255, 255, 0.2);
    flex-shrink: 0;
`;

const InfoBlock = styled.div`
    display: flex;
    align-items: center;
    margin-top: var(--spacing_x4);
`;

const BackStyled = styled(BackButton)`
    position: absolute;
    top: var(--spacing_x4);
    left: var(--spacing_x4);
`;

export const Start2 = () => {
    const ratio = useSizeRatio();
    const {next, user, setUserInfo} = useProgress();

    const handleNextPage = () => {
        setUserInfo({seenInfo: true});
        next(SCREENS.LOBBY);
    }

    return (
        <Wrapper $ratio={ratio}>
            <BackStyled onClick={() => next(SCREENS.START)}/>
            <Title $ratio={ratio}/>
            <Text>
                На каждом уровне тебе доступны <b>3 подсказки</b>. Если найдёшь решение без них,{' '}
                {user.isVip ? 'то заработаешь 5 билетиков и 100 монеток.' : 'то получишь 100 монеток.'}
            </Text>
            <Info>
                <Text>
                    Если используешь:
                </Text>
                <InfoBlock>
                    <TipBlock>1 подсказку</TipBlock>
                    <Text>начислим {user.isVip ? '3 билетика и ' : ''}70 монеток</Text>
                </InfoBlock>
                <InfoBlock>
                    <TipBlock>2 подсказки</TipBlock>
                    <Text>начислим {user.isVip ? '1 билетик и ' : ''}50 монеток</Text>
                </InfoBlock>
                <InfoBlock>
                    <TipBlock>3 подсказки</TipBlock>
                    <Text>начислим {user.isVip ? '0 билетиков и ' : ''}20 монеток</Text>
                </InfoBlock>
            </Info>
            <ButtonStyled onClick={handleNextPage}>Первый шифр</ButtonStyled>
        </Wrapper>
    )
}