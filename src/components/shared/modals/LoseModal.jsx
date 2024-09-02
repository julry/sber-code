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
    font-size: var(--font_xl);
`;

export const LoseModal = () => {
    const { modal, setModal } = useProgress();

    const handleClick = () => {
        modal?.onClick?.();

        setModal({...modal, visible: false})
    }

    return (
        <Modal>
            <BlockStyled>
                <p>{modal.text}</p>
            </BlockStyled>
            <ButtonStyled onClick={handleClick}>Ещё раз</ButtonStyled>
        </Modal>
    )
}