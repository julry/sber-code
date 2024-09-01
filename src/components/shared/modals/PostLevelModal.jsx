import styled from "styled-components";
import { useProgress } from "../../../contexts/ProgressContext";
import { Block } from "../Block";
import { Modal } from "./Modal";
import { Button } from "../Button";
import { weeks } from "../../../constants/weeks";
import { FlexWrapper } from "../FlexWrapper";
import { useSizeRatio } from "../../../hooks/useSizeRatio";
import { Coin } from "../icons";
import { Ticket } from "../icons/Ticket";
import { TIPS_TO_POINTS } from "../../../constants/tipsToPoints";

const ButtonStyled = styled(Button)`
    margin: var(--spacing_x5) 0 0;
`;

const AnswerBlock = styled(FlexWrapper)`
    flex-direction: row;
    justify-content: center;
    width: 100%;

    & + & {
        margin-top: var(--spacing_small);
    }
`;

const AnswerLetter = styled(FlexWrapper)`
    justify-content: center;
    width: ${({$ratio}) => $ratio * 38}px;
    height: ${({$ratio}) => $ratio * 50}px;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    /* font-weight: semibold; */
    font-size: 28px;
    box-shadow: inset 0 0 0 1px #FFFFFF, 0 0 0 ${({$ratio}) => $ratio * 3}px rgba(255, 255, 255, 0.2);
    border-radius: ${({$ratio}) => $ratio * 8}px;
    
    & + & { 
        margin-left: ${({$ratio}) => $ratio * 10}px;
    }
`;


const PostText = styled.p`
    margin: ${({$ratio}) => $ratio * 30}px 0 var(--spacing_x4);
    text-align: left;
`;

const PointsBlock = styled(AnswerBlock)`
    justify-content: left;
    margin-top: 0;
`;


const PointsWrapper = styled(PointsBlock)`
    width: auto;

    & + & {
        margin-top: 0;
        margin-left: var(--spacing_x5);
    }

    & > svg {
        width: ${({$ratio}) => $ratio * 55}px;
        height: ${({$ratio}) => $ratio * 55}px;
    }
`;

const Letters = styled(PointsWrapper)`
    width: ${({$ratio}) => $ratio * 85}px;
    font-size: ${({$ratio}) => $ratio * 22}px;
    flex-wrap: wrap;
    justify-content: center;

    & p + p {
        margin-left: ${({$ratio}) => $ratio * 4}px;
    }

    & p:nth-child(4) {
        margin-left: 0;
    }
`;

export const PostLevelModal = () => {
    const ratio = useSizeRatio();
    const { modal, setModal, user, usedTips={1: 2} } = useProgress();

    const currentWeek = weeks.find(({id}) => id === modal.week) ?? {};

    const handleClick = () => {
        setModal({visible: false, week: modal.week});
    }

    return (
        <Modal>
            <Block>
                {currentWeek?.answer.map((ans) => (
                    <AnswerBlock key={`ans_${ans.length}`}>
                        {
                            ans.split('').map((l, i) => (
                                <AnswerLetter $ratio={ratio} key={`ans_${ans.length + i}`}>
                                    {l}
                                </AnswerLetter>
                            ))
                        }
                    </AnswerBlock>
                ))}
                <PostText $ratio={ratio}>{currentWeek?.postText}</PostText>
                <PointsBlock>
                    {user.isVip && (
                        <PointsWrapper $ratio={ratio}>
                            <Ticket />
                            <p>{TIPS_TO_POINTS[usedTips[modal.week]].tickets}</p>
                        </PointsWrapper>
                    )}
                    <PointsWrapper $ratio={ratio}>
                        <Coin />
                        <p>{TIPS_TO_POINTS[usedTips[modal.week]].coins}</p>
                    </PointsWrapper>
                    <Letters $ratio={ratio}>
                        {currentWeek.letters.map((letter) => (<p>
                            {letter}
                        </p>))}
                    </Letters>
                </PointsBlock>
            </Block>
            <ButtonStyled onClick={handleClick}>На главную</ButtonStyled>
        </Modal>
    )
}