import styled from "styled-components"
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { FlexWrapper } from "../shared/FlexWrapper"
import final from '../../assets/images/finalBg.png';
import { Button } from "../shared/Button";
import { useProgress } from "../../contexts/ProgressContext";
import { TIPS_TO_POINTS } from "../../constants/tipsToPoints";

const Wrapper = styled(FlexWrapper)`
    padding: ${({$ratio}) => $ratio * 100}px ${({$ratio}) => $ratio * 22}px ${({$ratio}) => $ratio * 40}px;
    background: url(${final}) no-repeat center 100% / cover;

    & p {
        font-size: ${({$ratio}) => $ratio * 18}px;
    }
`;

const ButtonStyled = styled(Button)`
    margin: ${({$ratio}) => $ratio * 20}px 0 ${({$ratio}) => $ratio * 40}px;
`;

export const Finish = () => {
    const ratio = useSizeRatio();
    const {user, points, vipPoints} = useProgress();
    
    const getUserCoins = () => {
        if (!user.isVip) return points;

        let coins = 0; 

        for (let i = 0; i <= 5; i++) {
            coins = coins + TIPS_TO_POINTS[user.weekTickets[i] ?? 0].coins;
        }

        return coins;
    }

    return (
        <Wrapper $ratio={ratio}>
            <p>
                За дверью всё это время тебя ждал старт карьеры в Сбере. Скорее переходи к стажировке{'\n'}и отправляй заявку!
            </p>
            <ButtonStyled $ratio={ratio} onClick={() => window.open('https://sbergraduate.ru/sberseasons-moscow', '_blank')}>Узнать</ButtonStyled>
                <p>За всё время тебе удалось заработать {getUserCoins()} монеток{user.isVip ? ` и ${vipPoints} билетиков` : ''}.
                {user.isVip ? (
                    ' Регулярно проверяй почту и следи за результатами розыгрыша iPhone 15 Pro Max и карьерных консультаций!'
                ) : (
                    '\nРегулярно проверяй почту и следи за результатами розыгрыша!'
                )}
                </p>
        </Wrapper>
    )
}