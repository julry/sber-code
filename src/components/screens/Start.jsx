import styled from "styled-components";
import { useProgress } from "../../contexts/ProgressContext";
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { Button } from "../shared/Button";
import { FlexWrapper } from "../shared/FlexWrapper";
import { Rules1Text } from "../shared/texts/Rules1Text";
import start from '../../assets/images/start1.png';
import { SCREENS } from "../../constants/screens";

const Wrapper = styled(FlexWrapper)`
    padding: ${({$ratio}) => $ratio * 43}px ${({$ratio}) => $ratio * 22}px ${({$ratio}) => $ratio * 20}px;
    text-align: left;

    & h3 {
        margin-top:  ${({$ratio}) => $ratio * 10}px;
        text-align: left;
        width: 100%;
        font-size: var(--font_md);
        position: relative;
        z-index: 4;

        &:first-of-type {
            margin-top: 0;
        }
    }
`;

const Picture = styled.div`
    position: absolute;
    inset: 0;
    background: url(${start}) no-repeat center 100% / cover;
`;

const Title = styled(Rules1Text)`
    width: ${({$ratio}) => $ratio * 206}px; 
    height: ${({$ratio}) => $ratio * 52}px;
    margin-bottom: ${({$ratio}) => $ratio * 16}px;
    flex-shrink: 0;
`;

const SmallText = styled.p`
    font-size: var(--font_xs);
    margin-top: var(--spacing_x2);
    position: relative;
    z-index: 4;
`;

const ButtonStyled = styled(Button)`
    margin-top: auto;
`;

export const Start = () => {
    const ratio = useSizeRatio();
    const {next, user} = useProgress();

    return (
        <Wrapper $ratio={ratio}>
            <Picture />
            <Title $ratio={ratio}/>
            <h3>Разгадывай шифры, узнавай больше о Сбере и получай призы</h3>
            <SmallText>
                После каждой головоломки тебя ждут пасхалки для решения финального шифра.
            </SmallText>
            <h3>Зарабатывай монетки</h3>
            <SmallText> 
                {user.isVip ? (
                    'Монетки можно заработать за разгаданные шифры: они позволят тебе участвовать в еженедельном розыгрыше призов и ' +
                    'мерча. Тебя ждёт 4 недели и 5 шифров. Тебе нужно набрать минимум 50 монеток, чтобы участвовать в еженедельном розыгрыше.'
                ) : (
                    'Монетки можно заработать за разгаданные\nшифры: они позволят тебе участвовать\nв розыгрыше ' +
                    'призов и мерча в конце всех недель. Тебя ждёт 4 недели и 5 шифров. Нужно набрать минимум 250 монеток, ' +
                    'чтобы участвовать в розыгрыше.'
                )}
            </SmallText>
            {
                user.isVip && (
                    <>
                        <h3>Собирай билетики</h3>
                        <SmallText>
                            Билетики можно заработать за заход в игру каждую неделю и за разгаданные шифры:{' '}
                            чем больше билетиков соберёшь, тем выше шансы получить главный приз — iPhone 15 Pro Max и 
                            карьерную консультацию. Тебе нужно собрать минимум 15 билетиков, чтобы участвовать в розыгрыше.
                        </SmallText>
                    </>
                )
            }
            <h3>
                Следи за уведомлениями на почте
            </h3>
            <h3>Прояви смекалку и найди ключ к каждой загадке. Удачи!</h3>
            <ButtonStyled onClick={() => next(SCREENS.START2)}>Как получать награды?</ButtonStyled>
        </Wrapper>
    )
}