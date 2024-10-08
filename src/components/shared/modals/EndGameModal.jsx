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

const ProfileBtn = styled(Button)`
    background: transparent;
    border: none;
    width: auto;
    padding: 0 1px 0 1px;
    border-radius: 0;
    border-bottom: 1px solid white;
    margin-top: var(--spacing_x4);
`;

export const EndGameModal = () => {
    const { user, setModal } = useProgress();

    const handleClick = () => {
        window.open('https://t.me/careersber', '_blank');
    }

    return (
        <Modal>
            <BlockStyled>
                <p>
                    <b>Все твои награды учтены — игра подошла к концу!</b>{'\n\n'}
                    Здесь ты можешь посмотреть накопленные баллы и данные профиля.{'\n\n'}
                    Следи за оповещениями{' '}
                    <a href={`https://t.me/sbercryptography_bot?start=email_${btoa(user.email)}`} rel="noreferrer" target="_blank">в боте</a>,{' '} 
                    чтобы не пропустить результаты розыгрыша.
                    {'\n\n'}
                    Узнавай о карьерных возможностях и мероприятиях Сбера в ТГ-канале!
                </p>
            </BlockStyled>
            <ButtonStyled onClick={handleClick}>Перейти</ButtonStyled>
            <ProfileBtn onClick={() => setModal({type: 'profile', visible: true})}>Посмотреть прогресс</ProfileBtn>
        </Modal>
    )
}