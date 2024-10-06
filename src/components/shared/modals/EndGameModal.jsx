import styled from "styled-components";
import { useProgress } from "../../../contexts/ProgressContext";
import { Block } from "../Block";
import { Modal } from "./Modal";
import { Button } from "../Button";

const ButtonStyled = styled(Button)`
    margin: var(--spacing_x5) 0 0;
`;

const BlockStyled = styled(Block)`
    text-align: left;

    & a {
        color: inherit;
    }
`;

export const EndGameModal = () => {
    const { user, setModal } = useProgress();

    const handleClick = () => {
        setModal({type: 'profile', visible: true});
    }

    return (
        <Modal>
            <BlockStyled>
                <p>
                    <b>Все твои награды учтены — игра подошла к концу!</b>{'\n\n'}
                    Здесь ты можешь посмотреть накопленные баллы и данные профиля.{'\n\n'}
                    Следи за оповещениями{' '}
                    <a href={`https://t.me/sbercryptography_bot?start=email_${btoa(user.email)}`} rel="noreferrer" target="_blank">в боте</a>,{' '} 
                    чтобы не упустить результаты розыгрыша.
                </p>
            </BlockStyled>
            <ButtonStyled onClick={handleClick}>Посмотреть прогресс</ButtonStyled>
        </Modal>
    )
}