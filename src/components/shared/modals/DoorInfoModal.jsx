import styled from "styled-components";
import { useProgress } from "../../../contexts/ProgressContext";
import { Block } from "../Block";
import { Modal } from "./Modal";
import { Button } from "../Button";
import { weeks, WEEK_TO_GAME } from "../../../constants/weeks";

const ButtonStyled = styled(Button)`
    margin: var(--spacing_x5) 0 0;
`;

const BlockStyled = styled(Block)`
    text-align: left;
`;

export const DoorInfoModal = () => {
    const { modal, setModal, passedWeeks, next } = useProgress();

    const isPassed = passedWeeks.includes(modal.week);
    const currentWeek = weeks.find(({id}) => id === modal.week) ?? {};

    const handleClick = () => {
        setModal({visible: false, week: modal.week});

        if (isPassed) return;
        modal.onNext?.();
        next(WEEK_TO_GAME[modal.week]);
    }

    return (
        <Modal>
            <BlockStyled>
                <p>Эта дверь ведёт <b>в {currentWeek?.whereText}</b></p>
                <br />
                <p>{isPassed ? currentWeek?.factText : 'Давай посмотрим, какой шифр для тебя подготовили!'}</p>
            </BlockStyled>
            <ButtonStyled onClick={handleClick}>{isPassed ? 'Понятно' : 'Вперёд'}</ButtonStyled>
        </Modal>
    )
}