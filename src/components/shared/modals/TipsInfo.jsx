import styled from "styled-components";
import { useProgress } from "../../../contexts/ProgressContext";
import { Button } from "../Button";
import { Block } from "../Block";
import { Modal } from "./Modal";

const BlockStyled = styled(Block)`
    text-align: left;
`;

const ButtonStyled = styled(Button)`
    margin-top: var(--spacing_x4);
`;

const Info = styled.div`
    margin-top: var(--spacing_x5);
    width: 100%;
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
    margin-top: var(--spacing_x4);
`;

export const TipsInfoModal = () => {
    const { user, modal, setModal} = useProgress();

    const handleClose = () => {
        setModal({visible: false});
    }

    return (
        <Modal>
            <BlockStyled>
                {
                    modal.week === 5 ? (
                        <p>
                            Сначала нажимай на окошко, куда хочешь подставить символ, а потом на саму букву
                        </p>
                    ) : (
                        <>
                            <p>
                                На каждом уровне тебе доступны 3 подсказки. Если найдёшь решение без них,{' '}
                                {user.isVip ? 'то заработаешь 5 билетиков и 100 монеток.' : 'то получишь 100 монеток.'}
                            </p>
                            <Info>
                                <p>
                                    Если используешь:
                                </p>
                                <InfoBlock>
                                    <TipBlock>1 подсказку</TipBlock>
                                    <p>начислим {user.isVip ? '3 билетика и ' : ''}70 монеток</p>
                                </InfoBlock>
                                <InfoBlock>
                                    <TipBlock>2 подсказки</TipBlock>
                                    <p>начислим {user.isVip ? '1 билетик и ' : ''}50 монеток</p>
                                </InfoBlock>
                                <InfoBlock>
                                    <TipBlock>3 подсказки</TipBlock>
                                    <p>начислим {user.isVip ? '0 билетиков и ' : ''}20 монеток</p>
                                </InfoBlock>
                            </Info>
                        </>
                    )
                }
            </BlockStyled>
            <ButtonStyled onClick={handleClose}>Понятно</ButtonStyled>
        </Modal>
    )
}