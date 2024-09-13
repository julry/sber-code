import styled from "styled-components";
import { useProgress } from "../../../contexts/ProgressContext";
import { useSizeRatio } from "../../../hooks/useSizeRatio";
import { Block } from "../Block";
import { Button } from "../Button";
import { Bulb } from "../icons/Bulb";
import { TipButton } from "../TipButton";
import { Modal } from "./Modal";

const ButtonWrapper = styled.div`
    position: absolute;
    top: ${({$ratio}) => $ratio * 11}px;
    right: ${({$ratio}) => $ratio * 63}px;
    background: #23142E;
    border-radius: ${({$ratio}) => $ratio * 12}px;
    padding: ${({$ratio}) => $ratio * 9}px;
`;

const TipsButtonStyled = styled(TipButton)`
    pointer-events: none;
    cursor: auto;
`;

const BlockStyled = styled(Block)`
    margin-bottom: var(--spacing_x4);
    text-align: left;
`;

export const TipsRulesModal = () => {
    const ratio = useSizeRatio();
    const {setModal, user, modal} = useProgress();

    const handleClick = () => {
        setModal({visible: false, type: undefined})
    }

    return (
        <Modal>
            <ButtonWrapper $ratio={ratio}>
                <TipsButtonStyled $ratio={ratio}>
                    <Bulb />
                    <p>{3 - user.weekTips[modal.week] > 0 ? 3 - user.weekTips[modal.week] : 0}/3</p>
                </TipsButtonStyled>
            </ButtonWrapper>
            <BlockStyled>
                Здесь находятся твои подсказки — они облегчат тебе разгадку шифра. 
                {'\n\n'}Если будешь их использовать, то получишь меньше наград.
            </BlockStyled>
            <Button onClick={handleClick}>Понятно</Button>
        </Modal>
    )
}