import styled from "styled-components";
import { useProgress } from "../../contexts/ProgressContext"
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { Block } from "./Block";
import { Button } from "./Button";
import { FlexWrapper } from "./FlexWrapper";
import { LobbyHeader } from "./LobbyHeader";

const BlockStyled = styled(Block)`
    margin-top: ${({$ratio}) => $ratio * 146}px;
    text-align: center;
`;

const Title = styled.p`
    font-weight: bold;
    text-transform: capitalize;
    margin-bottom: var(--spacing_x5);
`;

const ButtonStyled = styled(Button)`
    margin-top: var(--spacing_x5);
`;

export const WeekScreen = ({weekName, text, ...props}) => {
    const ratio = useSizeRatio();
    const {next} = useProgress();

    return (
        <FlexWrapper {...props}>
            <LobbyHeader />
            <BlockStyled $ratio={ratio}>
                <Title>{weekName}</Title>
                <p>{text}</p>
                <ButtonStyled onClick={() => next()}>Начать</ButtonStyled>
            </BlockStyled>
        </FlexWrapper>
    )
}