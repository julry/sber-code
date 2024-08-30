import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { WEEK_TO_LOBBY } from "../../constants/weekToLobby";
import { CURRENT_WEEK, useProgress } from "../../contexts/ProgressContext";
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { Block } from "./Block";
import { Button } from "./Button";
import { FlexWrapper } from "./FlexWrapper"
import { LockWeek } from "./icons/LockWeek";
import { LobbyHeader } from "./LobbyHeader"
import { FirstRulesModal, MissedWeekModal, RefreshCoinsModal, WaitModal } from "./modals";
import { NewWeek } from "./modals/NewWeek";

const currentShadow = 'inset -4px -4px 6px 0 rgba(0, 0, 0, 0.25), inset 4px 4px 6px 0 rgba(255, 255, 255, 0.25)';
const passedShadow = 'inset -4px -4px 6px 0 rgba(0, 0, 0, 0.25), inset 4px 4px 6px 0 rgba(0, 0, 0, 0.25)';
const Levels = styled.div`
    margin-top: ${({$ratio}) => $ratio * 152}px;
    width: ${({$ratio}) => $ratio * 343}px;

    & button {
        width: 100%;
    }
`;

const ButtonStyled = styled(Button)`
    color: var(--color-white);
    margin-bottom: var(--spacing_small);
    ${({$unavailabe}) => $unavailabe ? 'background: #001418; opacity: 0.8; cursor: auto;' : ''};
    ${({$passed}) => $passed ? 'cursor: auto;' : ''};
    box-shadow: ${({$unavailabe, $passed}) => $unavailabe ? 'none' : $passed ? passedShadow : currentShadow};
`;

const BlockStyled = styled(Block)`
    margin-top: auto;
    margin-bottom: var(--spacing_x4);
`;

const WeeksBlock = styled.div`
    display: flex;
    align-items: center;
    margin-top: var(--spacing_small);
`;

const WeekButton = styled(Button)`
    width: ${({$ratio}) => $ratio * 66}px;
    height: ${({$ratio}) => $ratio * 50}px;
    ${({$unavailabe}) => $unavailabe ? 'background: #001418; opacity: 0.6' : ''};
    ${({$locked}) => $locked ? 'padding: 0; background: transparent' : ''};
    box-shadow: ${({$unavailabe, $passed}) => $unavailabe ? 'none' : $passed ? passedShadow : currentShadow};

    & + & {
        margin-left: var(--spacing_small);
    }

    & p {
        font-size: ${({$ratio}) => $ratio * 26}px;
        color: var(--color-green3);
    }

    & svg {
        width: 100%;
        height: 100%;
    }
`;

export const Lobby = ({ activeWeek, levelScreens, isShowRules}) => {
    const ratio = useSizeRatio();
    const {next, passedWeeks, passedWeekLevels, user, setUserInfo, setModal, modal} = useProgress();
    const [isModal, setIsModal] = useState(isShowRules && !user.seenRules);
    const [newWeekModal, setNewWeekModal] = useState(user.isVip && user.registerWeek !== CURRENT_WEEK && !user.weekLeafes.includes(CURRENT_WEEK))
    const [isNextWeekModal, setIsNextWeekModal] = useState(user.isFromGame && activeWeek === CURRENT_WEEK && passedWeeks.includes(activeWeek));
    const [isPrevWeekModal, setIsPrevWeekModal] = useState(user.isVip && user.isFromGame && passedWeeks.includes(activeWeek) && activeWeek < CURRENT_WEEK);
    const passedLevels = passedWeekLevels[activeWeek];
    const currentLevel = passedLevels.length + 1 > 3 ? 3 : passedLevels.length + 1;
    const lastWeek = passedWeeks.length + 1 > 4 ? 4 : passedWeeks.length + 1;
    const [isMissedModal, setIsMissedModal] = useState(false);

    const handleClickLevel = (level) => {
        if (currentLevel !== level || passedLevels.includes(level)) return;

        next(levelScreens[level]);
    }

    const handleClickWeek = (w) => {
        if (w > lastWeek || w === activeWeek) return;

        next(WEEK_TO_LOBBY[w]);
    };

    const handleCloseModal = () => {
        setIsModal(false);
        setUserInfo({seenRules: true});
        if (passedWeeks.length + 1 < CURRENT_WEEK) setIsMissedModal(true);
    }

    const handleClosePrevWeekModal = () => {
        setUserInfo({isFromGame: false});
        setIsPrevWeekModal(false);
    }

    const handleCloseWeekModal = () => {
        setUserInfo({seenWeekInfo: true});
        setIsMissedModal(false);
    }

    const handleCloseNextWeekModal = () => {
        setUserInfo({isFromGame: false});
        setIsNextWeekModal(false);
    }

    useEffect(() => {
        if (!user.isTgConnected && !newWeekModal && user.registerWeek !== CURRENT_WEEK) {
            setModal({visible: true, type: 'tg'});
        }

        if (!(isShowRules || user.seenWeekInfo) && passedWeeks.length + 1 < CURRENT_WEEK && !newWeekModal && modal.type !== 'tg') {
            setIsMissedModal(true);
        }
    }, [user.registerWeek, newWeekModal]);

    const levels = Array.from({length: 3}, (v, i) => i + 1);
    const weeks = Array.from({length: 4}, (v, i) => i + 1);

    return (
        <FlexWrapper>
            <LobbyHeader />
            <Levels $ratio={ratio}>
                {
                    levels.map((level) => (
                        <ButtonStyled
                            key={level}
                            color={level === 2 ? "green2" : level === 3 ? "green3" : undefined}
                            onClick={() => handleClickLevel(level)}
                            $unavailabe={currentLevel < level}
                            $passed={passedLevels.includes(level)}
                        >
                            Уровень {level}
                        </ButtonStyled>
                    ))
                }
                <Button color="white" onClick={() => next(levelScreens.cards)}>Собранные карточки недели</Button>
            </Levels>
            <BlockStyled>
                <p>Недели</p>
                <WeeksBlock>
                    {weeks.map((w) => (
                        <WeekButton 
                            key={`week${w}`}
                            $ratio={ratio}
                            $passed={w < lastWeek}
                            $unavailabe={w > lastWeek && w <= CURRENT_WEEK}
                            $locked={w > CURRENT_WEEK}
                            onClick={() => handleClickWeek(w)}
                        >
                            {w > CURRENT_WEEK ? (
                                <LockWeek />
                            ) : <p>{w}</p>}
                        </WeekButton>
                    ))}
                </WeeksBlock>
            </BlockStyled>
            {isModal && <FirstRulesModal onClose={handleCloseModal} />}
            {isMissedModal && <MissedWeekModal onClose={handleCloseWeekModal}/>}
            {isPrevWeekModal && <RefreshCoinsModal onClose={handleClosePrevWeekModal}/>}
            {isNextWeekModal && <WaitModal onClose={handleCloseNextWeekModal}/>}
            {newWeekModal && <NewWeek onClose={() => setNewWeekModal(false)}/>}
        </FlexWrapper>
    )
}