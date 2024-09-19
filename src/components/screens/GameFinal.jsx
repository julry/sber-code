import styled from "styled-components";
import { FlexWrapper } from "../shared/FlexWrapper";
import longLvlBg from '../../assets/images/longLvlBg.png';
import { useProgress } from "../../contexts/ProgressContext";
import { BackButton } from "../shared/BackButton";
import { Info } from "../shared/icons";
import { Bulb } from "../shared/icons/Bulb";
import { TipButton } from "../shared/TipButton";
import { IconButton } from "../shared/Button";
import { GameHeader } from "../shared/GameHeader";

const Wrapper = styled(FlexWrapper)`
    width: 100%;
    position: relative;
    height: 100%;
    background: url(${longLvlBg}) 0% 100% no-repeat;
    background-size: cover;
    padding: ${({$ratio}) => $ratio * 62}px ${({$ratio}) => $ratio * 23}px ${({$ratio}) => $ratio * 23}px;
`;


export const GameFinal = () => {
    const { setModal, user } = useProgress();
    const answer = 'Ты — настоящий детектив!';

    const handleClickTip = () => {

    }

    return (
        <Wrapper>
           <GameHeader onClickTip={handleClickTip} week={5}/>
        </Wrapper>
    )
}