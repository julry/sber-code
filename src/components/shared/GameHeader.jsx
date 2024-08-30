import styled from "styled-components";
import { IconButton } from "./Button";
import { BackButton } from "./BackButton";
import { useProgress } from "../../contexts/ProgressContext";
import { useSizeRatio } from "../../hooks/useSizeRatio";

const Wrapper = styled.div`
    position: absolute;
    top: var(--spacing_x4);
    left: var(--spacing_x4);
    right: var(--spacing_x4);
    padding: var(--spacing_small) var(--spacing_x3);
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 4;
    background-color: rgba(0, 49, 60, 0.6);
    border-radius: var(--border-radius-xl);
    font-size: ${({$ratio}) => $ratio * 25}px;
`;


export const GameHeader = ({ onBack, onClickRules }) => {
    const ratio = useSizeRatio();
    const { gamePoints } = useProgress();

    return (
        <Wrapper $ratio={ratio}>
            <BackButton onClick={onBack}/>
            <h3>{gamePoints}/8</h3>
            <IconButton icon={{width: 9, height: 16}} onClick={onClickRules}>
                <svg viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.65184 11H3.00651C3.00651 10.362 3.04881 9.80645 3.13341 9.33333C3.22451 8.85305 3.37419 8.42294 3.58243 8.04301C3.79067 7.65591 4.0705 7.28674 4.42191 6.93548C4.72777 6.64158 4.99458 6.36559 5.22234 6.10753C5.45011 5.84229 5.62581 5.56989 5.74946 5.29032C5.8731 5.01075 5.93492 4.70609 5.93492 4.37634C5.93492 3.98208 5.87961 3.6595 5.76898 3.4086C5.66486 3.15054 5.50868 2.95699 5.30043 2.82796C5.0987 2.69176 4.8449 2.62366 4.53905 2.62366C4.28525 2.62366 4.04772 2.68817 3.82646 2.8172C3.60521 2.93907 3.42625 3.13262 3.28959 3.39785C3.15293 3.66308 3.07809 4.01075 3.06508 4.44086H0C0.0195228 3.41577 0.23102 2.57706 0.63449 1.92473C1.03796 1.26523 1.57809 0.781362 2.25488 0.473118C2.93818 0.157706 3.69957 0 4.53905 0C5.46963 0 6.26681 0.16129 6.93059 0.483871C7.60087 0.806452 8.11171 1.28315 8.46312 1.91398C8.82104 2.5448 9 3.31541 9 4.22581C9 4.84946 8.89262 5.39785 8.67787 5.87097C8.46312 6.33692 8.17679 6.77419 7.81887 7.1828C7.46095 7.58423 7.06399 8.00358 6.62798 8.44086C6.25705 8.80645 6.00325 9.18638 5.86659 9.58065C5.72994 9.96774 5.65835 10.4409 5.65184 11ZM2.6551 14.2903C2.6551 13.81 2.81128 13.405 3.12364 13.0753C3.44252 12.7455 3.85575 12.5806 4.36334 12.5806C4.87093 12.5806 5.28091 12.7455 5.59328 13.0753C5.90564 13.405 6.06182 13.81 6.06182 14.2903C6.06182 14.7778 5.90564 15.1864 5.59328 15.5161C5.28091 15.8387 4.87093 16 4.36334 16C3.85575 16 3.44252 15.8387 3.12364 15.5161C2.81128 15.1864 2.6551 14.7778 2.6551 14.2903Z" fill="white"/>
                </svg>
            </IconButton>
        </Wrapper>  
    )
};
