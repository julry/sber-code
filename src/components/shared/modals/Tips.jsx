import { useRef, useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import tipPic from '../../../assets/images/tip.png';
import { tips } from "../../../constants/tips";
import { weeks } from "../../../constants/weeks";
import { useProgress } from "../../../contexts/ProgressContext";
import { useSizeRatio } from "../../../hooks/useSizeRatio";
import { Block } from "../Block";
import { Button, IconButton } from "../Button";
import { FlexWrapper } from "../FlexWrapper";
import { LobbyArrow } from "../icons/LobbyArrow";
import { Modal } from "./Modal";

const BlockStyled = styled(Block)`
    position: relative;
`;

const SliderButton = styled(IconButton)`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: ${({$ratio}) => $ratio * 40}px;
    height: ${({$ratio}) => $ratio * 40}px;
    
    &::before {
        display: none;
    }
`;

const NextSliderButton = styled(SliderButton)`
    right: 0;
`;

const LeftSliderButton = styled(SliderButton)`
    left: 0;

    & svg {
        transform: scale(-1, 1);
    }
`;

const TipPic = styled.img`
    width: ${({$ratio}) => $ratio * 219}px;
    height: ${({$ratio}) => $ratio * 215}px;
    margin-top: ${({$ratio}) => $ratio * -30}px;
    object-fit: contain;
`;

const AnswerText = styled.p`
    font-size: ${({$ratio}) => $ratio * 34}px;
`;

const TipBlock = styled(FlexWrapper)`
    justify-content: center;
    border-radius: ${({$ratio}) => $ratio * 5}px;
    height: ${({$ratio}) => $ratio * 210}px;
    width: ${({$ratio}) => $ratio * 210}px;
    background: rgba(188, 108, 244, 0.3);
`;

const Wrap = styled.div`
    height: 100%;
    width: 100%;
`;

const SmallText = styled.p`
    font-size: ${({$ratio}) => $ratio * 12}px;
    margin-top: ${({$ratio}) => $ratio * -42}px;
`;

const ButtonStyled = styled(Button)`
    margin-top: var(--spacing_x4);
`;

export const TipsModal = () => {
    const {setModal, user, modal, setUserInfo, updateUser} = useProgress();
    const ratio = useSizeRatio();
    const {week} = modal;
    const [shown, setShown] = useState(user.weekTips?.[modal.week] ? user.weekTips?.[modal.week] - 1 : 0);
    const [fullAnswer, setFullAnswer] = useState(user.weekTips[week] >= 3);
    const [isCorrectShown, setIsCorrectShown] = useState(user.weekTips[week] === 4);

    const sliderRef = useRef();

    const NextButton = (
        <NextSliderButton $ratio={ratio} icon={{width: 40, height: 40}} >
            <LobbyArrow />
        </NextSliderButton>
    );

    const PrevButton =  (
        <LeftSliderButton $ratio={ratio} icon={{width: 40, height: 40}}>
            <LobbyArrow />
        </LeftSliderButton>
    )

    const handleOpen = () => {
        if (user.weekTips[week] === 3) {
            setFullAnswer(true);
            sliderRef.current.slickGoTo(3);
        } else {
            updateUser({weekTips: Object.values({...user.weekTips, [week]: user.weekTips[week] + 1}).join(',')});
            // updateUser(Object.values({...user.weekTips, [week]: user.weekTips[week] + 1}).join(','));
            setUserInfo({weekTips: {...user.weekTips, [week]: user.weekTips[week] + 1}});
        }
    }

    const handleAnswer = () => {
        setIsCorrectShown(true);
        sliderRef.current.slickGoTo(3);
        if (user.weekTips[week] === 4) return;
        updateUser({weekTips: Object.values({...user.weekTips, [week]: user.weekTips[week] + 1}).join(',')});
        setUserInfo({weekTips: {...user.weekTips, [week]: user.weekTips[week] + 1}});
    }

    return (
        <Modal>
           <BlockStyled hasCloseIcon onClose={() => setModal({visible: false, week})}>
            <Wrap>
                <Slider
                    ref={sliderRef}
                    slidesToShow={1}
                    slidesToScroll={1}
                    adaptiveHeight={true}
                    initialSlide={shown}
                    infinite
                    speed={300}
                    draggable={false}
                    nextArrow={NextButton}
                    prevArrow={PrevButton}
                    beforeChange={(_, newInd) => setShown(newInd)}
                >
                    {tips[week]?.map((tip) => (
                        user.weekTips[week] >= tip.num ?
                        (
                            <Wrap key={tip.id}>
                                <FlexWrapper>
                                    <TipBlock $ratio={ratio}>
                                        {tip.Component({$ratio: ratio})}
                                    </TipBlock>
                                </FlexWrapper>
                            </Wrap>

                        )
                          : (
                            <Wrap key={tip.id}>
                                <FlexWrapper>
                                    <p><b>Подсказка {shown + 1}</b></p>
                                    <TipPic $ratio={ratio} src={tipPic}/>
                                    <SmallText $ratio={ratio}>Если используешь подсказку,{'\n'}то получишь меньше наград, а твой{'\n'}шанс победы в розыгрыше снизится.</SmallText>
                                </FlexWrapper>
                            </Wrap>
                        )
                    ))}
                    {fullAnswer && (
                        <Wrap>
                            <FlexWrapper>
                                {isCorrectShown ? (
                                    <TipBlock $ratio={ratio}>
                                        <AnswerText $ratio={ratio}>
                                            {weeks.find(({id}) => id === week).answer.join(' ')}
                                        </AnswerText>
                                    </TipBlock>
                                ) : (
                                    <>
                                        <p><b>Правильный ответ</b></p>
                                        <TipPic $ratio={ratio} src={tipPic}/>
                                        <SmallText $ratio={ratio} $fullAnswer={fullAnswer}>
                                                Если ты нажмёшь эту кнопку сейчас,{'\n'}то не получишь наград, а твой шанс{'\n'}
                                                победы в розыгрыше снизится.{'\n'}Уверен, что хочешь узнать ответ?
                                        </SmallText>
                                    </>
                                )}
                               
                            </FlexWrapper>
                        </Wrap>
                    )}
                </Slider>
                </Wrap>
           </BlockStyled>
           {fullAnswer ? (
                <>
                    <ButtonStyled 
                        disabled={isCorrectShown}
                        onClick={handleAnswer}
                    > 
                        Хочу узнать ответ
                    </ButtonStyled>
                    <ButtonStyled 
                        disabled={isCorrectShown}
                        onClick={() => setModal({visible: false, week})}
                    > 
                        Попробую еще
                    </ButtonStyled>
                </>
           ): (
                <ButtonStyled 
                    disabled={shown !== user.weekTips?.[modal.week] && user.weekTips[week] !== 3} 
                    onClick={handleOpen}
                > 
                    {user.weekTips[week] === 3 ? 'Узнать ответ' : 'Получить подсказку'}
                </ButtonStyled>
           )}
          
        </Modal>
    )
}