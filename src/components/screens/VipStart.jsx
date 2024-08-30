import { useProgress } from "../../contexts/ProgressContext"
import { FlexWrapper } from "../shared/FlexWrapper";
import reg from '../../assets/images/reg.png';
import { Button } from "../shared/Button";
import styled from "styled-components";
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { Ticket } from "../shared/icons/Ticket";

const Wrapper = styled(FlexWrapper)`
    padding: ${({$ratio}) => $ratio * 40}px ${({$ratio}) => $ratio * 32}px;
`;

const Picture = styled.div`
    position: absolute;
    inset: 0;
    background: url(${reg}) no-repeat center 100% / cover;
`;

const ButtonStyled = styled(Button)`
    margin-top: auto;
`;

const TicketWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${({$ratio}) => $ratio * 54}px;
    margin-left: ${({$ratio}) => $ratio * -40}px;
    margin-top: ${({$ratio}) => $ratio * 24}px;

    & svg {
        transform: rotate(-30deg);
        width: ${({$ratio}) => $ratio * 99}px;
        height: ${({$ratio}) => $ratio * 99}px;
        margin-right: ${({$ratio}) => $ratio * 14}px;
    }
`;

export const VipStart = () => {
    const ratio = useSizeRatio();
    const {setVipPoints, next} = useProgress();

    const handleNext = () => {
        setVipPoints(prev => prev + 1);
        next();
    }

    return (
        <Wrapper $ratio={ratio}>
            <Picture />
            <p>
                Отлично! За регистрацию ты получаешь 1 билетик.{'\n\n'}
                Каждую неделю при входе в игру ты будешь получать ещё по билетику.{'\n\n'}
                Чем больше их соберёшь, тем выше шанс победить в главном розыгрыше iPhone 16 Pro Max и карьерных консультаций.
            </p>
            <TicketWrapper  $ratio={ratio}>
                <Ticket />
                <p>1</p>
            </TicketWrapper>
            <ButtonStyled onClick={handleNext}>Далее</ButtonStyled>
        </Wrapper>
    )
}