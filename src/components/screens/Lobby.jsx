import Slider from "react-slick";
import styled from "styled-components";
import lobby from '../../assets/images/lobby.png';
import opened from '../../assets/images/door.png';
import closed from '../../assets/images/doorLocked.png';
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { useProgress } from "../../contexts/ProgressContext";
import { FlexWrapper } from "../shared/FlexWrapper";
import { Button, IconButton } from "../shared/Button";
import { LobbyArrow } from "../shared/icons/LobbyArrow";
import { LobbyHeader } from "../shared/LobbyHeader";
import { useState } from "react";
import { DoneMark } from "../shared/icons";
import { weeks } from "../../constants/weeks";
import { useLayoutEffect } from "react";
import { reachMetrikaGoal } from "../../utils/reachMetrikaGoal";
import { SCREENS } from "../../constants/screens";
import { useEffect } from "react";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background: url(${lobby}) center center no-repeat;
    background-size: cover;
    padding: ${({$ratio}) => $ratio * 20}px ${({$ratio}) => $ratio * 23}px ${({$ratio}) => $ratio * 36}px;
`;

const TgButton = styled(IconButton)`
    position: absolute;
    right: ${({$ratio}) => $ratio * 23}px;
    top: ${({$ratio}) => $ratio * 82}px;
`;

const Door = styled.div`
    width: ${({$ratio}) => $ratio * 195}px;
    height: ${({$ratio}) => $ratio * 372}px;
    background: rgba(255, 255, 255, 0.2);
    background-size: contain;
    background-position: 0 0;
    background-repeat: no-repeat;
    position: relative;
`;

const Header = styled(LobbyHeader)`
    margin-bottom: ${({$ratio}) => $ratio * 68}px;
`;

const OpenDoor = styled(Door)`
   background-image: url(${opened});
`;

const ClosedDoor = styled(Door)`
   background-image: url(${closed});
`;

const DoorBlock = styled.div`
   height: 100%;
   width: 100%;
`;

const DoneMarkStyled = styled(DoneMark)`
    width: ${({$ratio}) => $ratio * 123}px;
    height: ${({$ratio}) => $ratio * 121}px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const SliderButton = styled(IconButton)`
    position: absolute;
    top: ${({$ratio}) => $ratio * 186}px;
    width: ${({$ratio}) => $ratio * 64}px;
    height: ${({$ratio}) => $ratio * 64}px;
    ${({$auto}) => $auto ? 'cursor: auto' : ''};
    
    &::before {
        display: none;
    }
`;

const CenterWrapper = styled(FlexWrapper)`
    align-items: center;
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

const ButtonBlock = styled.div`
    width: 100%;
    margin-top: ${({$ratio}) => $ratio * 46}px;
`;

const RulesButton = styled(Button)`
    background: transparent;
    border: none;
    width: auto;
    padding: 0 1px 0 1px;
    border-radius: 0;
    border-bottom: 1px solid white;
    margin-top: ${({$ratio}) => $ratio * 15}px;
`;

export const Lobby = () => {
    const ratio = useSizeRatio();
    const { passedWeeks, user, setModal, currentWeek, next, setUserInfo } = useProgress();
    const lastWeek = (passedWeeks[passedWeeks.length - 1] ?? 0) + 1;
    const week = lastWeek > currentWeek ? currentWeek : lastWeek;
    const isFinalOpened = passedWeeks.includes(4);
    const [shown, setShown] = useState(isFinalOpened ? 4 : week - 1);
    const { registerWeek, isVip, weekTickets } = user;

    const notShownNext = isFinalOpened ? shown === 4 : shown === 3;
    const NextButton = (
        <NextSliderButton $ratio={ratio} icon={{width: 40, height: 40}} $auto={notShownNext} disabled={notShownNext}>
            {notShownNext ? null : <LobbyArrow />}
        </NextSliderButton>
    );

    const PrevButton = (
        <LeftSliderButton $ratio={ratio} icon={{width: 40, height: 40}} $auto={shown === 0}>
            {shown === 0 ? null : <LobbyArrow />}
        </LeftSliderButton>
    )

    const handleNextDoor = (id) => {
        if (id === 1) setModal({visible: true, type: 'tipsRules', week: 1});

        reachMetrikaGoal(`${user.isVip ? '' : 'non'}target_code${id}`);
    }

    const handleClick = (id, isFinal) => {
        if (isFinal) {
            next(SCREENS.FINAL_INTRO);
            return;
        }

        if (id > week) return;
        
        setModal({visible: true, type: 'week', week: id, onNext: () => handleNextDoor(id)});
    };

    useLayoutEffect(() => {
        if (isVip && registerWeek !== currentWeek && !weekTickets.includes(currentWeek)) {
            setModal({visible: true, type: 'newWeek'});
        } else if (isVip && !user.startRefresh && weekTickets.includes(currentWeek) && passedWeeks?.length > 0 && !passedWeeks.includes(currentWeek)) {
            setUserInfo({startRefresh: true});
            setModal({visible: true, type: 'refresh'});
        }
    }, [isVip, registerWeek, weekTickets, setModal, currentWeek]);
    
    const getButtonText = (id, date, isFinal) => {
        if (isFinal) return 'Финальный шифр';

        if (id <= week) return `Шифр №${id}`;
        if (id > currentWeek) return `Откроется ${date}`;

        return 'Реши предыдущий шифр'
    }

    return (
        <Wrapper $ratio={ratio}>
            <Header $ratio={ratio}/>
            <TgButton $ratio={ratio} onClick={() => setModal({visible: true, type: 'tg'})}>
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.1478 19.81C15.3951 17.5238 18.8942 16.0166 20.645 15.2884C25.6438 13.2092 26.6825 12.8481 27.3595 12.8361C27.5084 12.8335 27.8413 12.8704 28.057 13.0454C28.2391 13.1932 28.2892 13.3928 28.3132 13.5329C28.3371 13.673 28.367 13.9921 28.3433 14.2415C28.0724 17.0877 26.9003 23.9947 26.304 27.1825C26.0516 28.5314 25.5548 28.9837 25.0738 29.028C24.0285 29.1242 23.2348 28.3372 22.2224 27.6735C20.6381 26.635 19.7431 25.9886 18.2054 24.9752C16.4282 23.8041 17.5803 23.1604 18.5931 22.1085C18.8581 21.8332 23.4637 17.644 23.5528 17.264C23.564 17.2165 23.5743 17.0393 23.4691 16.9458C23.3638 16.8522 23.2085 16.8842 23.0964 16.9097C22.9375 16.9457 20.4067 18.6185 15.5039 21.928C14.7855 22.4213 14.1349 22.6617 13.5519 22.6491C12.9092 22.6352 11.6729 22.2857 10.7538 21.9869C9.62659 21.6205 8.73068 21.4268 8.80869 20.8045C8.84933 20.4803 9.29569 20.1488 10.1478 19.81Z" fill="white"/>
                    <rect x="3" y="3" width="34" height="34" rx="6.6" stroke="white" strokeWidth="2"/>
                    <rect x="2" y="2" width="36" height="36" rx="7.6" fill="white" fillOpacity="0.1"/>
                    <rect x="1" y="1" width="38" height="38" rx="8.6" stroke="white" strokeOpacity="0.2" strokeWidth="2"/>
                </svg>
            </TgButton>
            <Slider
                slidesToShow={1}
                slidesToScroll={1}
                adaptiveHeight={true}
                initialSlide={isFinalOpened ? 4 : week - 1}
                infinite={false}
                speed={300}
                draggable={false}
                nextArrow={NextButton}
                prevArrow={PrevButton}
                beforeChange={(_, newInd) => setShown(newInd)}
            >
                {weeks.map(({id, date, isFinal}) => (
                    <DoorBlock key={id}>
                        <CenterWrapper>
                            {id <= week || (isFinal && isFinalOpened) ? (
                                <OpenDoor $ratio={ratio}>
                                    {passedWeeks.includes(id) && (
                                        <DoneMarkStyled $ratio={ratio} onClick={() => handleClick(id)}/> 
                                    )}
                                </OpenDoor>
                            ) : <ClosedDoor $ratio={ratio}/>}
                            <ButtonBlock $ratio={ratio} onClick={() => handleClick(id, isFinal)}>
                                <Button>
                                    {getButtonText(id, date, isFinal)}
                                </Button>
                            </ButtonBlock>
                        </CenterWrapper>
                    </DoorBlock>
                ))}
            </Slider>
            <RulesButton $ratio={ratio} onClick={() => setModal({visible: true, type: 'lobbyRules'})}>
                Правила
            </RulesButton>
        </Wrapper>
    )
}