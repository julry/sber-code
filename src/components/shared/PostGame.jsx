import styled from "styled-components";
import { WEEK_TO_LOBBY } from "../../constants/weekToLobby";
import { CURRENT_WEEK, useProgress } from "../../contexts/ProgressContext";
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { BackButton } from "./BackButton";
import { Block } from "./Block";
import { Button } from "./Button";
import { FlexWrapper } from "./FlexWrapper";

const Wrapper = styled(FlexWrapper)`
    justify-content: center;
`;

const BlockStyled = styled(Block)`
    text-align: center;
`;

const ButtonStyled = styled(Button)`
    margin-top: var(--spacing_x4);
    width: ${({$ratio}) => $ratio * 343}px;
    
    & + & {
        margin-top: var(--spacing_small);
    }
`;

const BackButtonStyled = styled(BackButton)`
    position: absolute;
    top: var(--spacing_x4);
    left: var(--spacing_x4);
`;

export const PostGame = ({ text, week }) => {
    const ratio = useSizeRatio();
    const { weekPoints, next, user, setWeekPoints, setUserInfo } = useProgress();

    const isLastWeek = week === CURRENT_WEEK;

    const handleGoLobby = () => {
        setUserInfo({isFromGame: true});
        
        if (!isLastWeek || !user.isVip) {
            setWeekPoints(0);
        }

        next(WEEK_TO_LOBBY[week])
    };

    const handleLinkClick = () => {
        window.open('', '_blank');
    };

    const lastWeekText = (
        <p>
            Возвращайся в понедельник, чтобы пройти новые уровни!{'\n\n'}
            А пока можешь больше узнать о карьерных перспективах в СИБУРе :)
        </p>
    )

    const continueText = (
        <p>
            Переходи к следующим уровням и погружайся в мир СИБУРа
        </p>
    )

    return (
        <Wrapper>
            <BackButtonStyled onClick={handleGoLobby}/>
            <BlockStyled>
                {text}
                <br/><br/>
                <p>
                    Твои результаты — «{weekPoints}» баллов. 
                </p>
                <br/><br/>
                {isLastWeek ? lastWeekText : continueText}
            </BlockStyled>
            {!isLastWeek && (
                <ButtonStyled onClick={handleGoLobby} $ratio={ratio}>
                    Играть дальше
                </ButtonStyled>
            )}
            <ButtonStyled $ratio={ratio} color={isLastWeek ? 'green' : 'red'} onClick={handleLinkClick}>
                {isLastWeek ? 'Узнать' : 'Карьерный сайт СИБУР'}
            </ButtonStyled>
        </Wrapper>
    )
}