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

export const GameRulesModal = ({onClose, isFirstTime}) => {
    const ratio = useSizeRatio();

    return (
        <Modal isDarken>
            <Content>
                <Block isWhite hasCloseIcon={!isFirstTime} onClose={onClose}>
                    <p>
                        <b>Находи пары</b> одинаковых картинок, <b>переворачивая</b> по две карточки.{'\n'}
                        Если картинки не совпадут, 
                        то перевернутся обратно. {'\n\n'}
                        За <b>золотыми карточками</b> скрыты <b>вопросы</b> — если правильно ответишь, то получишь дополнительные баллы.
                        {isFirstTime ? '\n' : '\n\n'}
                        При выходе из игры прогресс текущего уровня не сохранится.
                        {isFirstTime ? '\n\n Чтобы не потерять результат внутри уровня, нужно найти пары для всех карточек.' : ''}
                    </p>
                </Block>
                {isFirstTime && <ButtonStyled $ratio={ratio} onClick={onClose}>Понятно</ButtonStyled>}
            </Content>
        </Modal>
    )
}