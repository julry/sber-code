import styled from "styled-components";
import { useProgress } from "../../../contexts/ProgressContext";
import { Block } from "../Block";
import { Button } from "../Button";
import { Modal } from "./Modal";

const ButtonStyled = styled(Button)`
    margin: var(--spacing_x5) 0 0;
`;

const Content = styled(Block)`
    text-align: left;
`;

export const RefreshCoinsModal = (props) => {
    const { setModal } = useProgress();

    return (
        <Modal>
            <Content hasCloseIcon onClose={() => setModal({visible: false})}>
                <p>
                    Ты успешно завершил прошлую неделю, монетки обнулились, так как розыгрыш уже прошёл.{'\n\n'}
                    Продолжай играть, чтобы участвовать в розыгрыше текущей недели!
                </p>
            </Content>
            <ButtonStyled onClick={() => setModal({visible: false})}>Вперёд!</ButtonStyled>
        </Modal>
    )
}