import styled from "styled-components";
import { useProgress } from "../../../contexts/ProgressContext";
import { Block } from "../Block";
import { Modal } from "./Modal";
import { Button } from "../Button";
import { SCREENS } from "../../../constants/screens";

const ButtonStyled = styled(Button)`
    margin: var(--spacing_x5) 0 0;
`;

const BlockStyled = styled(Block)`
    text-align: left;
`;

export const WinModal = () => {
    const { next, modal, setModal } = useProgress();

    const handleClick = () => {
        modal?.onClick?.();
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