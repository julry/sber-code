import styled from "styled-components";
import { SCREENS } from "../../../constants/screens";
import { useProgress } from "../../../contexts/ProgressContext";
import { useSizeRatio } from "../../../hooks/useSizeRatio";
import { Block } from "../Block";
import { Button } from "../Button";
import { Modal } from "./Modal";

const Text = styled.p`
    font-size: ${({$ratio}) => $ratio * 22}px;
`;

const ButtonWrapper = styled.div`
    width: 100%;
    margin-top: var(--spacing_x5);

    & button {
        width: 100%;
    }

    & button + button {
        margin-top: calc(var(--spacing_x4) - var(--spacing_x1)/2);
    }
`;

export const ExitModal = () => {
    const ratio = useSizeRatio();
    const { next, setModal } = useProgress();

    const handleQuit = () => {
        setModal({visible: false});

        next(SCREENS.LOBBY);
    }

    const handleCancel = () => {
        setModal({visible: false});
    }

    return (
        <Modal isDarken>
            <Block>
                <Text $ratio={ratio}>Если ты сейчас выйдешь, то введённые буквы сбросятся. Точно хочешь выйти?</Text>
            </Block>

            <ButtonWrapper>
                    <Button onClick={handleQuit}>Да</Button>
                    <Button onClick={handleCancel}>Нет</Button>
                </ButtonWrapper>
        </Modal>
    )
}