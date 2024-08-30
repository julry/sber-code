import styled from "styled-components";
import { useProgress } from "../../../contexts/ProgressContext";
import { useSizeRatio } from "../../../hooks/useSizeRatio";
import { Block } from "../Block";
import { Button } from "../Button";
import { Coin } from "../icons/Coin";
import { Ticket } from "../icons/Ticket";
import { Modal } from "./Modal";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    & + & {
        margin-left: var(--spacing_x5);
    }

    & > svg {
        width: ${({$ratio}) => $ratio * 55}px;
        height: ${({$ratio}) => $ratio * 55}px;
    }
`;

const Text = styled.p`
    font-size: ${({$ratio}) => $ratio * 22}px;
`;


export const CoinsRulesModal = (props) => {
    const { user, points, vipPoints, weekPoints, setModal, } = useProgress();
    const ratio = useSizeRatio();

    return (
        <Modal>
            <Block hasCloseIcon onClose={() => setModal({visible: false})}>
                <Text $ratio={ratio}><b>Полученные награды</b></Text>
                <Wrapper>
                    {user.isVip ? (
                        <>
                            <Wrapper>
                                <Ticket />
                                <Text>{weekPoints} / 500</Text>
                            </Wrapper>
                            <Wrapper>
                                <Coin />
                                <Text>{vipPoints} / 30</Text>
                            </Wrapper>
                        </>
                    ) : (
                        <Wrapper>
                            <Ticket />
                            <Text>{points} / 520</Text>
                        </Wrapper>
                    )}
                </Wrapper>
            </Block>
        </Modal>
    )
}