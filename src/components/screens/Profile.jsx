import styled from "styled-components";
import { IconButton } from "../shared/Button";
import { BackButton } from "../shared/BackButton";
import { useProgress } from "../../contexts/ProgressContext";
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { FlexWrapper } from "../shared/FlexWrapper";
import { SCREENS } from "../../constants/screens";
import { WEEK_TO_LOBBY } from "../../constants/weekToLobby";
import { Block } from "../shared/Block";
import { Input } from "../shared/Input";
import { useState } from "react";
import { LeafsRulesModal, TgModal, CoinsRulesModal } from "../shared/modals";
import { PointsButton } from "../shared/PointsButton";

const HeaderWrapper = styled.div`
    position: absolute;
    top: var(--spacing_x4);
    left: var(--spacing_x4);
    right: var(--spacing_x4);
    padding: var(--spacing_small) var(--spacing_x3);
    display: flex;
    justify-content: space-between;
    z-index: 4;
    background-color: rgba(0, 49, 60, 0.6);
    border-radius: var(--border-radius-xl);
    font-size: ${({$ratio}) => $ratio * 25};
`;

const BlockStyled = styled(Block)`
    margin-top: ${({$ratio}) => $ratio * 99}px;
`;

const InputStyled = styled(Input)`
    & + & {
        margin-top: var(--spacing_small);
    }
`;

const IdWrapper = styled.div`
    position: relative;
    margin: var(--spacing_small) 0;
    width: 100%;

    &::before {
        content: 'ID';
        left: 0;
        top: 0;
        position: absolute;
        left: ${({$ratio}) => $ratio * 14}px;
        top: ${({$ratio}) => $ratio * 9}px;
        width: ${({$ratio}) => $ratio * 17}px;
        height: ${({$ratio}) => $ratio * 20}px;
        font-size: var(--font_lg);
        color: #818181;
    }

    & input {
        padding-left:  ${({$ratio}) => $ratio * 40}px;
    }
`;

const IconButtonStyled = styled(IconButton)`
    & svg {
        margin-left: ${({$ratio}) => $ratio * -3}px;
    }
`;

const VipInfo = styled.p`
    font-weight: bold;
    margin: var(--spacing_x5) 0 var(--spacing_small);
`;

const InfoSign = styled.svg`
    flex-shrink: 0;
    width: var(--spacing_x5) !important; 
    height: var(--spacing_x5) !important;
    margin-left: ${({$hasMargin}) => $hasMargin ? 'calc(var(--spacing_small) / 2)' : 0} !important;
`;

export const Profile = () => {
    const ratio = useSizeRatio();
    const [isTg, setIsTg] = useState(false);
    const [isCoinModal, setIsCoinModal] = useState(false);
    const [isLeafModal, setIsLeafModal] = useState(false);
    const { next, passedWeeks, user, setModal } = useProgress();
    const week = (passedWeeks?.length ?? 0) + 1;

    const Info = (props) => (
        <InfoSign {...props} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" width="20" height="20" rx="10" fill="#008C95"/>
            <path d="M10.8621 11.6668H9.39251C9.39251 11.3123 9.41601 11.0037 9.46301 10.7408C9.51362 10.474 9.59678 10.2351 9.71247 10.024C9.82816 9.80895 9.98362 9.60385 10.1788 9.40871C10.3488 9.24543 10.497 9.0921 10.6235 8.94873C10.7501 8.80138 10.8477 8.65005 10.9164 8.49473C10.9851 8.33942 11.0194 8.17016 11.0194 7.98697C11.0194 7.76793 10.9887 7.58872 10.9272 7.44933C10.8694 7.30596 10.7826 7.19844 10.6669 7.12675C10.5548 7.05108 10.4138 7.01325 10.2439 7.01325C10.1029 7.01325 9.97096 7.04909 9.84804 7.12078C9.72512 7.18848 9.6257 7.29601 9.54978 7.44336C9.47386 7.59071 9.43228 7.78386 9.42505 8.02281H7.72223C7.73307 7.45331 7.85057 6.98736 8.07472 6.62496C8.29887 6.25857 8.59895 5.98975 8.97494 5.81851C9.35455 5.64328 9.77754 5.55566 10.2439 5.55566C10.7609 5.55566 11.2038 5.64527 11.5726 5.82448C11.9449 6.00369 12.2287 6.26853 12.424 6.61899C12.6228 6.96944 12.7222 7.39756 12.7222 7.90333C12.7222 8.24981 12.6626 8.55447 12.5433 8.81731C12.424 9.07617 12.2649 9.3191 12.066 9.54611C11.8672 9.76912 11.6467 10.0021 11.4044 10.245C11.1984 10.4481 11.0574 10.6592 10.9814 10.8782C10.9055 11.0933 10.8658 11.3561 10.8621 11.6668ZM9.19728 13.4947C9.19728 13.2279 9.28405 13.0029 9.45759 12.8197C9.63474 12.6365 9.86431 12.5449 10.1463 12.5449C10.4283 12.5449 10.6561 12.6365 10.8296 12.8197C11.0031 13.0029 11.0899 13.2279 11.0899 13.4947C11.0899 13.7655 11.0031 13.9925 10.8296 14.1757C10.6561 14.3549 10.4283 14.4446 10.1463 14.4446C9.86431 14.4446 9.63474 14.3549 9.45759 14.1757C9.28405 13.9925 9.19728 13.7655 9.19728 13.4947Z" fill="white"/>
        </InfoSign>
    );

    return (
        <FlexWrapper $ratio={ratio}>
            <HeaderWrapper $ratio={ratio}>
                <BackButton onClick={() => next(user?.lastPage ?? SCREENS[WEEK_TO_LOBBY[week > 4 ? 4 : week]])}/>
                <IconButtonStyled $ratio={ratio} color={'white'} icon={{width: 21, height: 17}} onClick={() => setModal({visible: true, type: 'tg'})}>
                    <svg viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.13698 7.8178C7.38406 5.51695 10.8915 4.02981 12.6592 3.30027C17.6537 1.22388 18.6919 0.859114 19.3654 0.831055C19.5057 0.831055 19.8424 0.859114 20.0668 1.02747C20.2352 1.16777 20.2913 1.36418 20.3194 1.50448C20.3474 1.64477 20.3755 1.95342 20.3474 2.20596C20.0668 5.03994 18.9164 11.9706 18.2991 15.1413C18.0466 16.4881 17.5415 16.9371 17.0645 16.9932C16.0263 17.0774 15.2126 16.2917 14.2025 15.6463C12.6311 14.6081 11.7332 13.9628 10.19 12.9526C8.42225 11.7742 9.57268 11.1288 10.5828 10.0906C10.8353 9.81001 15.4651 5.62918 15.5493 5.23635C15.5493 5.18024 15.5774 5.01188 15.4651 4.9277C15.3529 4.84353 15.2126 4.87158 15.1004 4.89964C14.932 4.9277 12.4067 6.61126 7.4963 9.92225C6.76676 10.4273 6.1214 10.6518 5.53215 10.6518C4.88679 10.6518 3.65218 10.287 2.72623 9.97836C1.60386 9.6136 0.705963 9.41718 0.790141 8.79988C0.846259 8.49123 1.29521 8.15452 2.13698 7.8178Z" fill="#008C95"/>
                    </svg>
                </IconButtonStyled>
            </HeaderWrapper>
            <BlockStyled $ratio={ratio}>
                <InputStyled readOnly value={user.name} />
                <IdWrapper  $ratio={ratio}>
                    <InputStyled readOnly value={user.id} />
                </IdWrapper>
                <InputStyled readOnly value={user.email} />
                <InputStyled readOnly value={user.university} />
                {user.isVip ? (
                    <>
                        <InputStyled readOnly value={user.fac}/>
                        <VipInfo>
                            Еженедельный зачёт:
                        </VipInfo>
                        <PointsButton isShowAmount={false} onClick={() => setIsCoinModal(true)}>
                            <Info />
                        </PointsButton>
                        <VipInfo>
                            Общий зачёт:
                        </VipInfo>
                        <PointsButton type="leaf" onClick={() => setIsLeafModal(true)} isShowAmount={false}>
                            <Info $hasMargin />
                        </PointsButton>
                    </>
                ) : (
                    <PointsButton isShowAmount={false} onClick={() => setIsCoinModal(true)}>
                            <Info />
                    </PointsButton>
                )}
            </BlockStyled>
            {isTg && (<TgModal onClose={() => setIsTg(false)}/>)}
            {isCoinModal && (<CoinsRulesModal onClose={() => setIsCoinModal(false)}/>)}
            {isLeafModal && (<LeafsRulesModal onClose={() => setIsLeafModal(false)}/>)}
        </FlexWrapper>  
    )
};
