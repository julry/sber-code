import styled from 'styled-components';
import logo from '../../assets/images/logo.svg';
import { useSizeRatio } from '../../hooks/useSizeRatio';

const Wrapper = styled.div`
    position: relative;
    z-index: 2;
    width: ${({$ratio}) => $ratio * 157}px;
    height: ${({$ratio}) => $ratio * 43}px;
    margin-bottom: ${({$ratio}) => $ratio * 34}px;
    background: url(${logo}) no-repeat 0 0 / cover;
    flex-shrink: 0;
`;

export const Logo = (props) => {
    const ratio = useSizeRatio();

    return <Wrapper {...props} $ratio={ratio} />
}