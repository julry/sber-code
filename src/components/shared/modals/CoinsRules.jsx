import styled from "styled-components";
import { useProgress } from "../../../contexts/ProgressContext";
import { useSizeRatio } from "../../../hooks/useSizeRatio";
import { Block } from "../Block";
import { Coin } from "../icons/Coin";
import { Ticket } from "../icons/Ticket";
import { Modal } from "./Modal";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    & + & {
        margin-left: var(--spacing_x5);
    }

    & > svg {
        flex-shrink: 0;
        width: ${({$ratio}) => $ratio * 55}px;
        height: ${({$ratio}) => $ratio * 55}px;
    }
`;

const Text = styled.p`
    font-size: ${({$ratio}) => $ratio * 22}px;
`;


export const CoinsRulesModal = () => {
    const { user, points, vipPoints, weekPoints, setModal, passedWeeks } = useProgress();
    const ratio = useSizeRatio();
    const isLastWeek = ((passedWeeks[passedWeeks.length - 1] ?? 0) + 1) >= 4;

    const handleTicketClick = () => {
        setModal({visible: true, type: 'tickets', onClose: () => setModal({visible: true, type: 'points'})});
    }

    const handleCoinsClick = () => {
        setModal({visible: true, type: 'coins', onClose: () => setModal({visible: true, type: 'points'})});
    }

    return (
        <Modal>
            <Block hasCloseIcon onClose={() => setModal({visible: false})}>
                <Text $ratio={ratio}><b>Полученные награды</b></Text>
                <Wrapper>
                    {user.isVip ? (
                        <>
                            <Wrapper $ratio={ratio} onClick={handleCoinsClick}>
                                <Coin />
                                <Text>{weekPoints} / {isLastWeek ? 200 : 100}</Text>
                            </Wrapper>
                            <Wrapper $ratio={ratio} onClick={handleTicketClick}>
                                <Ticket />
                                <Text>{vipPoints} / 31</Text>
                            </Wrapper>
                        </>
                    ) : (
                        <Wrapper $ratio={ratio} onClick={handleCoinsClick}>
                            <Coin />
                            <Text>{points} / 540</Text>
                        </Wrapper>
                    )}
                </Wrapper>
            </Block>
        </Modal>
    )
}