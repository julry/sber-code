import styled from "styled-components";
import { useProgress } from "../../../contexts/ProgressContext";
import { Block } from "../Block";
import { Modal } from "./Modal";
import { Button } from "../Button";
import { useSizeRatio } from "../../../hooks/useSizeRatio";

const Title = styled.p`
    font-size: ${({$ratio}) => $ratio * 22}px;
    margin-bottom: ${({$ratio}) => $ratio * 25}px;
    font-weight: 600;
`;

const ButtonStyled = styled(Button)`
    margin: var(--spacing_x5) 0 0;
`;

const TipBlock = styled.div`
    padding: var(--spacing_small);
    font-weight: 600;
    margin-right: var(--spacing_small);
    border-radius: var(--border-radius-xl);
    border: 1px solid #FFFFFF;
    background: rgba(255, 255, 255, 0.2);
    flex-shrink: 0;
`;

const InfoBlock = styled.div`
    display: flex;
    align-items: center;
    padding: var(--spacing_small) 0;
`;

const InfoText = styled.p`
    margin-top: ${({$ratio}) => $ratio * 18}px;
`;

export const TicketModal = () => {
    const { setModal } = useProgress();

    return (
        <Modal>
            <Block>
                <Title>Это билетики</Title>
                <p>
                  Билетики даются:
                </p>
                <InfoBlock>
                    <TipBlock>от 1 до 5 билетиков</TipBlock>
                    <p>За решение шифра</p>
                </InfoBlock>
                <InfoBlock>
                    <TipBlock>1 билетик</TipBlock>
                    <p>За еженедельный вход в игру</p>
                </InfoBlock>
                <InfoBlock>
                    <TipBlock>1 билетик</TipBlock>
                    <p>За подписку на телеграм-канал</p>
                </InfoBlock>
                <InfoText>
                    Чем больше билетиков соберёшь, тем выше шансы получить главный приз — iPhone 16 Pro Max{' '}
                    и карьерную консультацию. Розыгрыш будет проведён 7 октября.
                </InfoText>
            </Block>
            <ButtonStyled onClick={() => setModal({visible: false})}>Понятно</ButtonStyled>
        </Modal>
    )
}