import styled from "styled-components";
import { useProgress } from "../../contexts/ProgressContext";
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { IconButton } from "./Button";
import { Coin, Leaf } from "./icons";

const StarWrapper = styled(IconButton)`
    border-radius: var(--border-radius-xl);
    min-width: ${({$ratio}) => $ratio * 90}px;
    width: auto !important;
    padding-left: var(--spacing_x3);
    padding-right: var(--spacing_x3);
    color: var(--color-white);
    background: var(--color-${({$type}) => $type === 'coin' ? 'yellow' : 'red'});
    flex-shrink: 0;

    p {
        font-size: calc(var(--font_lg) + 2px);
    }

    & svg {
        flex-shrink: 0;
        width: ${({$ratio, $type}) => $ratio * ($type === 'coin' ? 13 : 17)}px;
        height: ${({$ratio, $type}) => $ratio * ($type === 'coin' ? 18 : 17)}px;
        margin-left: calc(var(--spacing_x1) * 1.5);        
    }
`;

export const PointsButton = ({text, type = "coin", isShowAmount = true, ...props}) => {
    const ratio = useSizeRatio();
    const { user, points, weekPoints, vipPoints } = useProgress();

    const getAmount = () => {
        if (user.isVip) {
            if (type === 'coin') return isShowAmount ? `${weekPoints}/34` : weekPoints;
            else return isShowAmount ? `${vipPoints}/5` : vipPoints;
        }
        return isShowAmount ? `${points}/151` : points;
    }

    return (
        <StarWrapper {...props} $ratio={ratio} $type={type}>
            <p>{text ?? getAmount()}</p>
            {type === 'coin' ? <Coin /> : <Leaf />}
            {props.children}
        </StarWrapper>
    )
}