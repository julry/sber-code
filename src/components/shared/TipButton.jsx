import styled from "styled-components";
import { Button } from "./Button";

export const TipButton = styled(Button)`
    display: flex;
    justify-content: center;
    width: auto;
    align-items: center;
    border-radius:  ${({$ratio}) => $ratio * 10}px;
    padding: ${({$ratio}) => $ratio * 4}px ${({$ratio}) => $ratio * 8}px;

    & svg {
        margin-right: ${({$ratio}) => $ratio * 6}px;
        width: ${({$ratio}) => $ratio * 22}px;
        height: ${({$ratio}) => $ratio * 32}px;
    }
`;