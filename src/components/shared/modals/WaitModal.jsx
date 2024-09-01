import styled from "styled-components";
import { useProgress } from "../../../contexts/ProgressContext";
import { useSizeRatio } from "../../../hooks/useSizeRatio";
import { Block } from "../Block";
import { Button } from "../Button";
import { Modal } from "./Modal";

const Text = styled.p`
    font-size: ${({$ratio}) => $ratio * 22}px;
`;

const ButtonStyled = styled(Button)`
    margin: var(--spacing_x5) 0 0;
`;

export const WaitModal = (props) => {
    const ratio = useSizeRatio();
    const {setModal} = useProgress();

    return (
        <Modal isDisabledAnimation>
            <Block>
                <Text $ratio={ratio}>
                    Увидимся на следующей неделе!
                </Text>
            </Block>
            <ButtonStyled onClick={() => setModal({visible: false})}>Вперёд!</ButtonStyled>
        </Modal>
    );
};
