import styled from "styled-components";
import { useSizeRatio } from "../../../hooks/useSizeRatio";
import { Block } from "../Block";
import { Modal } from "./Modal";
import { Button } from "../Button";
import { FlexWrapper } from "../FlexWrapper";

const Content = styled(FlexWrapper)`
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const ButtonStyled = styled(Button)`
    margin-top: var(--spacing_x4);
    width: ${({$ratio}) => $ratio * 343}px;
`;

export const MissedWeekModal = (props) => {
    const ratio = useSizeRatio();

    return (
        <Modal isDarken>
            <Content>
                <Block isWhite>
                    <p>
                        На данном этапе <b>уже открыты несколько недель</b>. Их нужно пройти последовательно.{'\n\n'}
                        Обрати внимание,{'\n'}
                        что в еженедельном розыгрыше{'\n'}
                        ты можешь участвовать только{'\n'}
                        при прохождении уровней <b>последней доступной недели</b>.
                    </p>
                </Block>
                <ButtonStyled $ratio={ratio} onClick={() => props.onClose()}>Понятно</ButtonStyled>
            </Content>
        </Modal>
    )
}