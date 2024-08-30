import styled from "styled-components";
import { useSizeRatio } from "../../hooks/useSizeRatio";

const Wrapper = styled.button`
    outline: none;
    background: rgba(255, 255, 255, 0.15);
    color: #FFFFFF;
    font-size: var(--font_lg); 
    width: 100%;
    border: 1px solid #FFFFFF;
    padding: ${({$ratio}) => $ratio * 11}px 0;
    border-radius: var(--border-radius-xl);
    cursor: pointer;
    position: relative;
    z-index: 2;
    flex-shrink: 0;
    transition: background-color 0.2s, border-color 0.2s, color 0.2s;

    &:disabled {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.2);
        color: rgba(255, 255, 255, 0.2);
    }
`;

const IconWrapper = styled(Wrapper)`
    display: flex;
    border: none;
    background: transparent;
    justify-content: center;
    align-items: center;
    width: ${({$ratio}) => $ratio * 40}px;
    height: ${({$ratio}) => $ratio * 40}px;
    padding: 0;
    flex-shrink: 0;
    border-radius: 50%;

    & svg:first-of-type {
        width: ${({$ratio, $svgWidth}) => $ratio * $svgWidth}px;
        height: ${({$ratio, $svgHeight}) => $ratio * $svgHeight}px;
    }
`;

export const Button = ({color = 'green', ...props}) => {
    const ratio = useSizeRatio();

    return <Wrapper {...props} $color={color} $ratio={ratio} />
}

export const IconButton = ({icon = {}, color = 'green2', ...props}) => {
    const ratio = useSizeRatio();
    const {width = 40, height = 40} = icon;

    return <IconWrapper {...props} $svgWidth={width} $svgHeight={height} $color={color} $ratio={ratio} />
}
