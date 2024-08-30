import styled from "styled-components";
import { useProgress } from "../../../contexts/ProgressContext";
import { useSizeRatio } from "../../../hooks/useSizeRatio";
import { Block } from "../Block";
import { Modal } from "./Modal";
import { Button } from "../Button";
import { useState } from "react";

const Content = styled(Block)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
`;

const ButtonStyled = styled(Button)`
    margin-top: var(--spacing_x5);
`;

const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    & button {
        width: calc((100% - var(--spacing_x3) + (var(--spacing_x1) / 2))/2);
    }
`;

const ProgressWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin: var(--spacing_x5) 0;
`;

const ProgressCircle  = styled.div`
    width: ${({$ratio}) => $ratio * 7}px;
    height: ${({$ratio}) => $ratio * 7}px;
    border-radius: 50%;
    background-color: var(--color-${({$isActive}) => $isActive ? 'green2' : 'green'});
    opacity: ${({$isActive}) => $isActive ? 1 : 0.3};
    transition: background-color 0.2s;

    & + & {
        margin-left:  ${({$ratio}) => $ratio * 7}px;
    }
`;

export const PrizesModal = () => {
    const ratio = useSizeRatio();
    const [part, setPart] = useState(0);
    const { user, setModal } = useProgress();
    const amount = 3;
    const progress = Array.from({length: amount}, (v, i) => i);

    const Progress = () => (
        <ProgressWrapper>
            {progress.map((p) => (
                <ProgressCircle key={p} $isActive={p === part} $ratio={ratio}/>
            ))}
        </ProgressWrapper>
    );

    const getContent = () => {
        let content;
        switch (part) {
            case 0: 
                content = (
                    <p>
                        <b>Давай расскажем, что тебя ждёт:</b>{'\n\n'}
                        Всё, что нужно, — <b>переворачивать карточки</b> про карьеру в СИБУРе 
                        и <b>искать одинаковые</b>. Каждую неделю будут открываться 
                        3 новых уровня.
                    </p>
                );
                break;

            case 1: 
                content = (
                    <p>
                        <b>В конце каждой недели</b> будут разыгрываться призы и мерч.
                        {'\n\n'}
                        Чтобы участвовать{'\n'}
                        в еженедельном розыгрыше, необходимо набрать <b>минимум</b>{'\n'}
                        <b>20 монеток</b>. Всего тебя ждёт{'\n'}
                        <b>4 недели игр</b>.
                    </p>
                )
                break;
            case 2: 
                content = (
                    <p>
                       Следи за уведомлениями{'\n'}в <b>Telegram-боте</b>. Если станешь победителем — ищи{' '}
                       <b>стойку СИБУРа в своем вузе</b>, чтобы забрать призы. {'\n\n'}
                       <b>Важно</b>:{'\n'}
                        с собой необходимо будет взять студенческий!
                    </p>
                )
                break;

            default: break;
        }

        return (
            <Content isWhite>
                {content}
                <Progress />
                {part === 0 ? (
                    <Button onClick={() => setPart(prev => prev + 1)}>Далее</Button>
                ) : (
                    <ButtonsWrapper>
                        <Button color="green2" onClick={() => setPart(prev => prev - 1)}>Назад</Button>
                        <Button onClick={() => part === 2 ? setModal({visible: false}) : setPart(prev => prev + 1)}>Далее</Button>
                    </ButtonsWrapper>
                )}
                
            </Content>
        )
    }

    return (
        <Modal isDarken isDisabledAnimation>
            {user?.isVip ? getContent() : (
                <Content isWhite>
                    <p>
                        <b>Давай расскажем, что тебя ждёт:</b>{'\n\n'}
                        Всё, что нужно, — <b>переворачивать карточки</b> про карьеру в СИБУРе 
                        и <b>искать одинаковые</b>. Каждую неделю будут открываться 
                        3 новых уровня.{'\n\n'}
                        Всего тебя ждёт <b>4 недели игр</b>.{'\n'} 
                        В конце будут разыгрываться призы среди игроков, набравших <b>минимум 75 баллов</b>.
                    </p>
                    <ButtonStyled onClick={() => setModal({visible: false})}>Далее</ButtonStyled>
                </Content>
            )}
        </Modal>
    )
};
