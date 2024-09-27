import styled from "styled-components";
import { useProgress } from "../../../contexts/ProgressContext";
import { useSizeRatio } from "../../../hooks/useSizeRatio";
import { Block } from "../Block";
import { Coin, Profile } from "../icons";
import { Ticket } from "../icons/Ticket";
import { Modal } from "./Modal";

const Subtitle = styled.h4`
    font-size: var(--font_md);
    margin-bottom: var(--spacing_x3);
    font-weight: 300;
`;

const BlockStyled = styled(Block)`
    text-align: left;
`;

const Text = styled.p`
    font-size: var(--font_md);
    font-weight: 600;
`;

const InfoBlock = styled.div`
    width: 100%;
    margin-top: ${({$ratio}) => $ratio * 22}px;
`;

const IdBlock = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

const ProfileIcon = styled(Profile)`
    width:  ${({$ratio}) => $ratio * 40}px;
    height: ${({$ratio}) => $ratio * 40}px;
    margin-right: ${({$ratio}) => $ratio * 5}px;
`;

const PointsInfo = styled.div`
    width: 100%;
    margin-top: ${({$ratio}) => $ratio * 34}px;
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 100%;
`;

const PointsWrapper = styled(Wrapper)`
    width: calc(100% - var(--spacing_x5));
    flex-shrink: 1;
    justify-content: left;

    & + & {
        margin-left: var(--spacing_x5);
    }

    & > svg {
        width: ${({$ratio}) => $ratio * 55}px;
        height: ${({$ratio}) => $ratio * 55}px;
    }
`;

export const ProfileModal = () => {
    const ratio = useSizeRatio();
    const { user, weekPoints, vipPoints, points, setModal, passedWeeks } = useProgress();
    const isLastWeek = ((passedWeeks[passedWeeks.length - 1] ?? 0) + 1) >= 4;

    return (
        <Modal>
            <BlockStyled onClose={() => setModal({visible: false})} hasCloseIcon>
                <IdBlock>
                    <ProfileIcon $ratio={ratio} color={'var(--color-black)'}/>
                    <Text>ID {user.id}</Text>
                </IdBlock>
                <InfoBlock $ratio={ratio}>
                    <Subtitle>ФИ</Subtitle>
                    <Text>{user.name}</Text>
                </InfoBlock>
                <InfoBlock $ratio={ratio}>
                    <Subtitle>Вуз и факультет</Subtitle>
                    <Text>{user.university}</Text>
                </InfoBlock>
                <InfoBlock $ratio={ratio}>
                    <Subtitle>Почта</Subtitle>
                    <Text>{user.email}</Text>
                </InfoBlock>
                <PointsInfo $ratio={ratio}>
                    <Text>Полученные награды</Text>
                    <PointsWrapper>
                        {user.isVip ? (
                            <>
                                <PointsWrapper $ratio={ratio}>
                                    <Coin />
                                    <Text>{weekPoints} / {isLastWeek ? 200 : 100}</Text>
                                </PointsWrapper>
                                <PointsWrapper $ratio={ratio}>
                                    <Ticket />
                                    <Text>{vipPoints} / 32</Text>
                                </PointsWrapper>
                            </>
                        ) : (
                                <PointsWrapper $ratio={ratio}>
                                    <Coin />
                                    <Text>{points} / 540</Text>
                                </PointsWrapper>
                        )}
                    </PointsWrapper>
                </PointsInfo>
            </BlockStyled>
        </Modal>
    )
}