import styled from "styled-components";
import { CURRENT_WEEK, useProgress } from "../../../contexts/ProgressContext";
import { Block } from "../Block";
import { Modal } from "./Modal";
import { Button } from "../Button";
import { PointsButton } from "../PointsButton";
import { useSizeRatio } from "../../../hooks/useSizeRatio";

const Content = styled(Block)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding-left: var(--spacing_x5);
    padding-right: var(--spacing_x5);
    text-align: center;
`;

const Text = styled.p`
    margin-bottom: var(--spacing_x4);
`

const ButtonStyled = styled(Button)`
    margin: var(--spacing_x4) 0 0;
    width: ${({$ratio}) => $ratio * 343}px;
`;

export const NewWeek = (props) => {
    const ratio = useSizeRatio();
    const { user, setVipPoints, setUserInfo } = useProgress();

    const handleClick = () => {
        setVipPoints(prev => prev + 1);
        setUserInfo({weekLeafes: [...user.weekLeafes, CURRENT_WEEK]});

        props.onClose();
    }

    return (
        <Modal isDarken isDisabledAnimation>
            <Content isWhite>
                <Text>
                    Держи листик за заход{'\n'}на новой неделе!
                </Text>
                <PointsButton type="leaf" text={1} />
                <ButtonStyled $ratio={ratio} onClick={handleClick}>Далее</ButtonStyled>
            </Content>
        </Modal>
    )
}