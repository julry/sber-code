import styled from "styled-components";
import intro from '../../assets/images/intro.png';
import { Button } from "../shared/Button";
import { useProgress } from "../../contexts/ProgressContext";
import { FlexWrapper } from "../shared/FlexWrapper";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: calc(3 * var(--spacing_x5)) var(--spacing_x5) calc(2 * var(--spacing_x5));
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Picture = styled.div`
    position: absolute;
    inset: 0;
    background: url(${intro}) no-repeat center 100% / cover;
`;

const ButtonWrapper = styled(FlexWrapper)`
    margin-top: auto;
    width: 100%;
    flex-grow: 1;
    justify-content: flex-end;
`;

export const FinalIntro = () => {
    const { next } = useProgress();

    const handleNext = () => {
        next();
    };

    return (
        <Wrapper>
            <Picture />
            <p>
                Четыре недели ты успешно{'\n'}разгадывал сложные шифры.{'\n\n'}
                Кажется, что это конец, но нет — впереди тебя ждёт главное испытание: помнишь случайные символы в качестве наград?{'\n\n'}
                Теперь тебе предстоит решить финальный шифр и получить ключ. Что он откроет? Как и раньше — пока секрет :)
            </p>
            <ButtonWrapper>
                <Button onClick={handleNext}>Финальный шифр</Button>
            </ButtonWrapper>
        </Wrapper>
    )
};
