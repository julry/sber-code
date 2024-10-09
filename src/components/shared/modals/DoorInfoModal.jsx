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
    const { modal, setModal, passedWeeks, next, currentWeek } = useProgress();

    const isFinalWeek = currentWeek === 5;
    const isPassed = passedWeeks.includes(modal.week) || isFinalWeek;
    const currentGameWeek = weeks.find(({id}) => id === modal.week) ?? {};

    const handleClick = () => {
        setModal({visible: false, week: modal.week});

        if (isPassed) return;
        window?._tmr?.push({ type: 'reachGoal', id: 3564011, goal: 'stat-sba'});
        modal.onNext?.();
        next(WEEK_TO_GAME[modal.week]);
    }

    return (
        <Modal>
            <BlockStyled>
                <p>Эта дверь ведёт <b>в {currentGameWeek?.whereText}</b></p>
                <br />
                <p>{isPassed ? currentGameWeek?.factText : 'Давай посмотрим, какой шифр для тебя подготовили!'}</p>
            </BlockStyled>
            <ButtonStyled onClick={handleClick}>{isPassed ? 'Понятно' : 'Вперёд'}</ButtonStyled>
        </Modal>
    )
}