import styled from "styled-components";
import { CURRENT_WEEK, useProgress } from "../../../contexts/ProgressContext";
import { Block } from "../Block";
import { Modal } from "./Modal";
import { Button } from "../Button";
import { SCREENS } from "../../../constants/screens";
import { TIPS_TO_POINTS } from "../../../constants/tipsToPoints";

const ButtonStyled = styled(Button)`
    margin: var(--spacing_x5) 0 0;
`;

const BlockStyled = styled(Block)`
    text-align: left;
`;

export const WinModal = () => {
    const { next, modal, passedWeeks, setModal, user, setVipPoints, setWeekPoints, setPoints, setPassedWeeks } = useProgress();

    const handleClick = () => {
        modal?.onClick?.();
        const {coins, tickets} = TIPS_TO_POINTS[user.weekTips[modal.week]] ?? {};
        const data = {};
        
        if (user.isVip) {
            if (passedWeeks.length + 1 === CURRENT_WEEK) {
                data.weekPoints = coins;
                setWeekPoints(coins);
            }

            data.targetPoints = tickets;
            setVipPoints(tickets);
        } else {
            data.points = coins;
            setPoints(coins);
        }

        setPassedWeeks(prev => {
            const weeks = prev.includes(modal.week) ? prev : [...prev, modal.week];

            data.passedWeeks = weeks;

            return weeks;
        });

        setModal({...modal, visible: false});
        setTimeout(() => {
            setModal({visible: true, type: 'finishWeek', week: modal.week});
            next(SCREENS.LOBBY);
        }, 0);
    }

    return (
        <Modal>
            <BlockStyled>
                <p>{modal.text}</p>
            </BlockStyled>
            <ButtonStyled onClick={handleClick}>Здорово!</ButtonStyled>
        </Modal>
    )
}