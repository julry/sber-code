import styled from "styled-components";
import { useProgress } from "../../../contexts/ProgressContext";
import { useSizeRatio } from "../../../hooks/useSizeRatio";
import { Block } from "../Block";
import { Modal } from "./Modal";

const Title = styled.h3`
    margin-top: ${({$ratio}) => $ratio * 12}px;
    text-align: left;
    width: 100%;
    font-size: var(--font_md);
`

const SmallText = styled.p`
    font-size: var(--font_xs);
    margin-top: var(--spacing_x2);
`;

const BlockStyled = styled(Block)`
    text-align: left;
`;

export const LobbyRulesModal = () => {
    const ratio = useSizeRatio();
    const {user, setModal} = useProgress();

    return (
        <Modal>
            <BlockStyled hasCloseIcon onClose={() => setModal({visible: false})}>
            <Title $ratio={ratio}>Разгадывай шифры, узнавай больше о Сбере и получай призы</Title>
            <SmallText>
                После каждой головоломки тебя ждут пасхалки для решения финального шифра.
            </SmallText>
            <Title $ratio={ratio}>Зарабатывай монетки</Title>
            <SmallText> 
                {user.isVip ? (
                    'Монетки можно заработать за разгаданные шифры: они позволят тебе участвовать в еженедельном розыгрыше призов и ' +
                    'мерча. Тебя ждёт 4 недели и 5 шифров. Тебе нужно набрать минимум 50 монеток, чтобы участвовать в еженедельном розыгрыше.'
                ) : (
                    'Монетки можно заработать за разгаданные\nшифры: они позволят тебе участвовать\nв розыгрыше ' +
                    'призов и мерча в конце всех недель. Тебя ждёт 4 недели и 5 шифров. Нужно набрать минимум 250 монеток, ' +
                    'чтобы участвовать в розыгрыше. \n' +
                    'Ты можешь дополнительно получить 20 монеток, если пригласишь 3 или больше новых игроков.\n' +
                    'Для этого попроси их при регистрации указать твой ID.'
                )}
            </SmallText>
            {
                user.isVip && (
                    <>
                        <Title $ratio={ratio}>Собирай билетики</Title>
                        <SmallText>
                            Билетики можно заработать за заход в игру каждую неделю и за разгаданные шифры:{' '}
                            чем больше билетиков соберёшь, тем выше шансы получить главный приз — iPhone 15 Pro Max и 
                            карьерную консультацию. Ты можешь дополнительно получить 2 билетика, если пригласишь 3 или больше новых игроков со своего факультета. Для этого попроси их при регистрации указать твой ID.
                        </SmallText>
                    </>
                )
            }
            <Title $ratio={ratio}>
                Следи за уведомлениями на почте
            </Title>
            <Title $ratio={ratio}>Прояви смекалку и найди ключ к каждой загадке. Удачи!</Title>
            </BlockStyled>
        </Modal>
    );
};
