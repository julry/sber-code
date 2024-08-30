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

export const RefreshCoinsModal = (props) => {
    return (
        <Modal isDarken isDisabledAnimation>
            <Content isWhite hasCloseIcon onClose={props.onClose}>
                <p>
                    Ты успешно завершил прошлую неделю, <b>монетки обнулились</b>, так как розыгрыш уже прошёл.{'\n\n'}
                    <b>Продолжай играть</b>, чтобы участвовать в <b>розыгрыше текущей недели</b>!
                </p>
            </Content>
        </Modal>
    )
}