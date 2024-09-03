import styled from "styled-components";
import { useProgress } from "../../../contexts/ProgressContext";
import { Block } from "../Block";
import { Modal } from "./Modal";
import { Button } from "../Button";
import { useSizeRatio } from "../../../hooks/useSizeRatio";

const Title = styled.p`
    font-size: ${({$ratio}) => $ratio * 22}px;
    margin-bottom: ${({$ratio}) => $ratio * 20}px;
    font-weight: 600;
`;

const BlockStyled = styled(Block)`
    text-align: left;
    align-items: flex-start;
    width: 100%;
    padding-left: ${({$ratio}) => $ratio * 15}px;
    padding-right: ${({$ratio}) => $ratio * 5}px;
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
    margin-bottom: ${({$ratio}) => $ratio * 16}px;
`;

const List = styled.div`
    margin: ${({$ratio}) => $ratio * 16}px 0 ${({$ratio}) => $ratio * 16}px ${({$ratio}) => $ratio * 13}px;

    & li + li {
        margin-top: ${({$ratio}) => $ratio * 8}px;
    }

    & li::marker {
        font-size: ${({$ratio}) => $ratio * 12}px;
    }
`;

export const CoinsModal = () => {
    const { modal, setModal, user } = useProgress();
    const ratio = useSizeRatio();

    const handleClose = () => {
        if (modal.onClose){
            modal?.onClose();

            return;
        }

        setModal({visible: false});
    }

    return (
        <Modal>
            <BlockStyled $ratio={ratio}>
                <div>
                    <Title $ratio={ratio}>Это монетки.</Title>
                    <p>Монетки даются:</p>
                    <List $ratio={ratio}>
                        <ul>
                            <li>За решение шифра</li>
                            {!user.isVip && <li>За подписку на телеграм-канал</li>}
                        </ul>
                    </List>
                    <InfoText $ratio={ratio}>
                        На каждом уровне тебе доступны <b>3 подсказки</b>. Если найдёшь решение без них, то получишь 100 монеток.
                    </InfoText>
                    <p>Если используешь</p>
                    <InfoBlock>
                        <TipBlock>1 подсказку</TipBlock>
                        <p>начислим 70 монеток</p>
                    </InfoBlock>
                    <InfoBlock>
                        <TipBlock>2 подсказки</TipBlock>
                        <p>начислим 50 монеток</p>
                    </InfoBlock>
                    <InfoBlock>
                        <TipBlock>3 подсказки</TipBlock>
                        <p>начислим 20 монеток</p>
                    </InfoBlock>
                </div>
            </BlockStyled>
            <ButtonStyled onClick={handleClose}>Понятно</ButtonStyled>
        </Modal>
    )
}