import styled from "styled-components";
import { useProgress } from "../../../contexts/ProgressContext";
import { Block } from "../Block";
import { Modal } from "./Modal";
import { Button } from "../Button";

const ButtonStyled = styled(Button)`
    margin: var(--spacing_x5) 0 0;
`;

const Close = styled(Button)`
    background: transparent;
    border: none;
    width: auto;
    padding: 0 1px 0 1px;
    border-radius: 0;
    border-bottom: 1px solid white;
    margin-top: var(--spacing_x4);
`;

export const TgModal = () => {
    const { user, setVipPoints, modal, setUserInfo, setModal } = useProgress();

    const handleClick = () => {
        if (!user.isTgConnected) {
            if (user.isVip) setVipPoints(prev => prev + 1);
            setUserInfo({isTgConnected: true});
        }

        setModal({visible: false});
    }

    return (
        <Modal isDisabledAnimation={modal.isDisabledAnimation}>
            <Block>
                <p>
                    В нашем <b>телеграм-боте</b> ты можешь следить за <b>обновлениями</b> игры 
                    и находить <b>ответы</b> на возможные вопросы. Там же мы огласим ID <b>победителей</b> розыгрыша!{'\n\n'}
                    {user?.isVip ? (
                        <>
                            Кстати, в боте можно подписаться на полезный канал про карьерные возможности и получить <b>дополнительный билетик</b>.
                        </>
                    ) : (
                        <>
                            Кстати, в боте можно подписаться на полезный канал про карьерные возможности и получить <b>20 монеток</b>.
                        </>
                    )}
                </p>
            </Block>
            <ButtonStyled onClick={handleClick}>Перейти</ButtonStyled>
            <Close onClick={() => setModal({visible: false})}>Закрыть</Close>
        </Modal>
    )
}