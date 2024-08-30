import styled from "styled-components";
import { useProgress } from "../../../contexts/ProgressContext";
import { useSizeRatio } from "../../../hooks/useSizeRatio";
import { Block } from "../Block";
import { Profile } from "../icons";
import { Modal } from "./Modal";

const Subtitle = styled.h4`
    font-size: var(--font_md);
    margin-bottom: var(--spacing_x3);
    font-weight: 300;
`;

const Text = styled.p`
    font-size: var(--font_md);
    font-weight: 600; //semibold?
`;

const InfoBlock = styled.div`
    margin-top: ${({$ratio}) => $ratio * 22}px;
`;

const IdBlock = styled.div`
    display: flex;
    align-items: center;
`;

const ProfileIcon = styled(Profile)`
    width:  ${({$ratio}) => $ratio * 40}px;
    height: ${({$ratio}) => $ratio * 40}px;
`;

const PointsInfo = styled.div`
    margin-top: ${({$ratio}) => $ratio * 34}px;
`;

const PointsWrapper = styled.div`
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

export const ProfileModal = (props) => {
    const ratio = useSizeRatio();
    const { user, weekPoints, vipPoints, points } = useProgress();

    return (
        <Modal>
            <Block onClose={props.onClose} hasCloseIcon>
                <IdBlock>
                    <ProfileIcon $ratio={ratio} color={'var(--color-black)'}/>
                    <div>
                        <Subtitle>ID</Subtitle>
                        <Text>{user.id}</Text>
                    </div>
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
                </PointsInfo>
            </Block>
        </Modal>
    )
}