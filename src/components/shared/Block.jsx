import styled from "styled-components";
import { useSizeRatio } from "../../hooks/useSizeRatio";

const Wrapper = styled.div`
    position: relative;
    padding: ${({$hasCloseIcon}) => $hasCloseIcon ? 'calc(var(--spacing_x5) + var(--spacing_x1)/2)' : 'var(--spacing_x5)'} var(--spacing_x3) var(--spacing_x5);
    background-color: rgba(36, 21, 47, 0.9);
    color: var(--color-white);
    width: ${({$ratio}) => $ratio * 330}px;
    border-radius: ${({$ratio}) => $ratio * 15}px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    box-shadow: 0 0 0 1px white;
`;

const CloseIcon = styled.button`
    position: absolute;
    top: var(--spacing_small);
    right: var(--spacing_small);
    background: transparent;
    outline: none;
    border: none;
    width: ${({$ratio}) => $ratio * 12}px;
    height: ${({$ratio}) => $ratio * 12}px;
    cursor: pointer;
`;

export const Block = ({hasCloseIcon, onClose, children, isWhite, ...props}) => {
    const ratio = useSizeRatio();

    return (
        <Wrapper {...props} $isWhite={isWhite} $hasCloseIcon={hasCloseIcon} $ratio={ratio}>
            {children}
            {hasCloseIcon && (
                <CloseIcon $ratio={ratio} onClick={onClose}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_330_3436)">
                        <path d="M1.47089 1.471L10.5291 10.5292M10.5291 1.471L1.47089 10.5292" stroke="white" strokeOpacity="0.4" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_330_3436">
                        <rect width="12" height="12" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                </CloseIcon>
            )}
        </Wrapper>
    )
}