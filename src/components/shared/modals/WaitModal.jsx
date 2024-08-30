import styled from "styled-components";
import { Block } from "../Block";
import { Modal } from "./Modal";

const Content = styled(Block)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
`;

export const WaitModal = (props) => {
    return (
        <Modal isDarken isDisabledAnimation>
            <Content isWhite hasCloseIcon onClose={props.onClose}>
                <p>
                    Увидимся <b>на следующей неделе</b>!{'\n'}
                    Пока можешь посмотреть открытые карточки
                </p>
            </Content>
        </Modal>
    )
}