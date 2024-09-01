import styled from "styled-components";
import { useProgress } from "../../../contexts/ProgressContext";
import { Block } from "../Block";
import { Modal } from "./Modal";
import { Button } from "../Button";
import { weeks } from "../../../constants/weeks";

const ButtonStyled = styled(Button)`
    margin: var(--spacing_x5) 0 0;
`;

const BlockStyled = styled(Block)`
    text-align: left;
`;

export const FinishInfoModal = () => {
    const { modal, setModal } = useProgress();

    const currentWeek = weeks.find(({id}) => id === modal.week) ?? {};

    const handleClick = () => {
        setModal({type: 'postLevel', week: modal.week,});
    }

    return (
        <Modal>
            <BlockStyled>
                <p>Поздравляем с успешным прохождением уровня! Лови факт про <b>{currentWeek?.whereText}</b></p>
                <br />
                <p>{currentWeek?.factText}</p>
            </BlockStyled>
            <ButtonStyled onClick={handleClick}>Понятно</ButtonStyled>
        </Modal>
    )
}