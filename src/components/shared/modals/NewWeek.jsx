import styled from "styled-components";
import { useProgress } from "../../../contexts/ProgressContext";
import { useSizeRatio } from "../../../hooks/useSizeRatio";
import { Block } from "../Block";
import { Button } from "../Button";
import { Ticket } from "../icons/Ticket";
import { Modal } from "./Modal";

const Text = styled.p`
    font-size: ${({$ratio}) => $ratio * 22}px;
`;

const ButtonStyled = styled(Button)`
    margin: var(--spacing_x5) 0 0;
`;

const TicketWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${({$ratio}) => $ratio * 32}px;
    margin-left: ${({$ratio}) => $ratio * -20}px;
    margin-top: ${({$ratio}) => $ratio * 15}px;

    & svg {
        transform: rotate(-30deg);
        width: ${({$ratio}) => $ratio * 76}px;
        height: ${({$ratio}) => $ratio * 76}px;
        margin-right: ${({$ratio}) => $ratio * 14}px;
    }
`;


export const NewWeekModal = () => {
    const ratio = useSizeRatio();
    const {user, vipPoints, setModal, setVipPoints, setUserInfo, updateUser, currentWeek, passedWeeks} = useProgress();

    const handleClose = () => {
        const data = {
            weekTickets: [...user.weekTickets, currentWeek].join(','),
            targetPoints: vipPoints + 1
        }

        setVipPoints(prev => prev + 1);

        setUserInfo({weekTickets: [...user.weekTickets, currentWeek]});
        updateUser(data);
        if (passedWeeks?.length > 0 && !passedWeeks.includes(currentWeek)) {
            setModal({visible: true, type: 'refresh'})
        } else {
            setModal({visible: false});
        }
    };
    
    return (
        <Modal>
            <Block>
                <Text $ratio={ratio}>
                        Рады снова{'\n'}тебя видеть! Держи билетик и отправляйся разгадывать новый шифр!
                </Text>
                <TicketWrapper $ratio={ratio}>
                    <Ticket />
                    <p>1</p>
                </TicketWrapper>
            </Block>
            <ButtonStyled onClick={handleClose}>Вперёд!</ButtonStyled>
        </Modal>
    );
};
