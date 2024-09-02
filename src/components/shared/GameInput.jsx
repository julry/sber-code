import styled from "styled-components";
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { Input } from "./Input";

const Wrapper = styled(Input)`
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${({$ratio}) => $ratio * 38}px;
    height: ${({$ratio}) => $ratio * 50}px;
    background: rgba(255, 255, 255, 0.2);
    font-weight: 600;
    box-shadow: inset 0 0 0 1px #FFFFFF, 0 0 0 ${({$ratio}) => $ratio * 3}px rgba(255, 255, 255, 0.2);
    border-radius: ${({$ratio}) => $ratio * 8}px;
    
    & + & { 
        margin-left: ${({$ratio}) => $ratio * 10}px;
    }

    & input {
        color: white;
        font-size: 28px;
        padding: 0;
        background: transparent;
        width: 100%;
        text-align: center;
    }
`;


export const GameInput = (props) => {
    const ratio = useSizeRatio();

    return <Wrapper {...props} $ratio={ratio}/> 
}