import styled from "styled-components"
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { FlexWrapper } from "../shared/FlexWrapper"
import intro from '../../assets/images/intro.png';
import { Button } from "../shared/Button";
import { useProgress } from "../../contexts/ProgressContext";

const Wrapper = styled(FlexWrapper)`
    padding: ${({$ratio}) => $ratio * 100}px ${({$ratio}) => $ratio * 22}px ${({$ratio}) => $ratio * 40}px;
    background: url(${intro}) no-repeat center 100% / cover;
`;

const Text = styled.p`
    font-size: ${({$ratio}) => $ratio * 22}px;
`;

const ButtonStyled = styled(Button)`
    margin-top: auto;
`;

export const PreFinish = () => {
    const ratio = useSizeRatio();
    const {next} = useProgress();
    
    return (
        <Wrapper $ratio={ratio}>
            <Text $ratio={ratio}>
                Интересный был месяц, не так ли? Сколько загадок, сколько тайн… Пришло время узнать, что тебя ждёт за решение всех шифров!
            </Text>
            <ButtonStyled onClick={() => next()}>Узнать</ButtonStyled>
        </Wrapper>
    )
}