import styled from "styled-components";
import intro from '../../assets/images/intro.png';
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { Logo } from "../shared/Logo";
import { PlugText } from "../shared/texts/PlugText";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: var(--spacing_x8) calc(var(--spacing_x5) + var(--spacing_x4)/2) 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: url(${intro}) no-repeat;
    background-position: center calc(100% +  ${({$ratio}) => $ratio * 80}px);
    background-size: cover;
    font-size: ${({$ratio}) => $ratio * 18}px;

    & a {
        text-decoration: underline;
        color: inherit;
    }
`;


const Light = styled.div`
    position: absolute;
    z-index: 1;
    top: ${({$ratio}) => $ratio * -200}px;
    width: ${({$ratio}) => $ratio * 316}px; 
    height: ${({$ratio}) => $ratio * 316}px;
    border-radius: 50%;
    left: 50%;
    transform: translateX(-50%);
    background: radial-gradient(50% 50% at 50% 50%, #14EAB0 0%, rgba(20, 234, 176, 0) 100%);
    filter: blur(46.3px);
`;

const Title = styled(PlugText)`
    width: ${({$ratio}) => $ratio * 222}px; 
    height: ${({$ratio}) => $ratio * 52}px;
    margin-bottom: ${({$ratio}) => $ratio * 30}px;
    flex-shrink: 0;
`;

const LogoStyled = styled(Logo)`
    margin-bottom: ${({$ratio}) => $ratio * 99}px;
`;

export const Plug = () => {
    const ratio = useSizeRatio();
    return (
        <Wrapper $ratio={ratio}>
            <LogoStyled $ratio={ratio}/>
            <Light $ratio={ratio}/>
            <Title $ratio={ratio}/>
            <p>
                Следи за карьерными{'\n'}возможностями и{'\n'}мероприятиями Сбера <a href="https://t.me/careersber" target="_blank">тут</a>
            </p>
        </Wrapper>
    )
};
