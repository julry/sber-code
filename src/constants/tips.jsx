import styled from "styled-components";
import tip21 from "../assets/images/tip21.png";
import tip22 from "../assets/images/tip22.png";
import tip23 from "../assets/images/tip23.png";

const TextSmall = styled.p`
    text-align: left;
    margin: var(--spacing_x3) var(--spacing_small);

    font-size: ${({$ratio}) => $ratio * 13}px;
`;

const TipSmall = styled.p`
    font-size: ${({$ratio}) => $ratio * 25}px;
    margin-top: ${({$ratio}) => $ratio * -5}px;
`;

const TextMd = styled.p`
    font-size: ${({$ratio}) => $ratio * 18}px;
`;

const TextLg = styled.p`
    font-size: ${({$ratio}) => $ratio * 42}px;
`;

const ImageStyled = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

const ImageSmall = styled(ImageStyled)`
    height: 54.7%;
    margin-top: var(--spacing_x4);
`;

export const tips = {
    1: [
        {
            id: '1_1',
            num: 1,
            Component: (props) => (
                <TextSmall {...props}>
                    Сбер предлагает оплачиваемые стажировки для студентов по специальностям IT, математика,{' '}
                    экономика и юриспруденция. Всего за <b>3 месяца</b> вы полностью погрузитесь в профессию, получите бесценный опыт{' '}
                    и возможность <b>вырасти</b> по карьерной лестнице!
                </TextSmall>
            )
        },
        {
            id: '1_2',
            num: 2,
            Component: (props) => (
                <TextMd {...props}>
                    «Пришёл, увидел, победил»{'\n\n'}
                    © Гай Юлий Цезарь
                </TextMd>
            )
        },
        {
            id: '1_3',
            num: 3,
            Component: (props) => (
                <>
                    <TextLg {...props}>
                        Р = У
                    </TextLg>
                    <TipSmall {...props}>(+3)</TipSmall>
                </>
            )
        }
    ],
    2: [
        {
            id: '2_1',
            num: 1,
            Component: () => (
                <>
                    <p>
                        Посмотри,{'\n'}где ты можешь{'\n'}работать!
                    </p>
                    <ImageSmall src={tip21} alt="" />
                </> 
            )
        },
        {
            id: '2_2',
            num: 2,
            Component: () => <ImageStyled src={tip22} alt="" />
        },
        {
            id: '2_3',
            num: 3,
            Component: () => <ImageStyled src={tip23} alt="" />
        }
    ]
}