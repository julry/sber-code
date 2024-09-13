import { useState } from "react";
import styled from "styled-components";
import { useSizeRatio } from "../../hooks/useSizeRatio";

const Container = styled.div`
    position: relative;
    width: ${({$ratio}) => $ratio * 274}px;
    border-radius: var(--border-radius-sm);
    box-shadow:${({$isCorrect}) => $isCorrect === undefined ? 'none' : $isCorrect === false ? '0 0 0 1px #DD3838' : '0 0 0 1px #14EAB0'};
`;

const Wrapper = styled.input`
    padding: var(--spacing_small) var(--spacing_sm);
    padding-right: calc(var(--spacing_small) + var(--icon_size));
    font-size: var(--font_sm);
    outline: none;
    border: none;
    border-radius: var(--border-radius-sm);
    background: var(--color-white);
    width: 100%;
    color: #000000;

    &::placeholder {
        color: rgba(0,0,0,0.4);
    }
`;

const Postfix = styled.div` 
    position: absolute;
    top: var(--spacing_x2);
    right: var(--spacing_small);
    width: var(--icon_size);
    height: var(--icon_size);
`;

export const Input = ({value, onChange, type, postfix, readOnly, placeholder, checkCorrect, ...props}) => {
    const [isCorrect, setIsCorrect] = useState();

    const ratio = useSizeRatio();
    const handleBlur = () => {
        setIsCorrect(checkCorrect?.())
    }

    const handleChange = (e) => {
        setIsCorrect();
        onChange?.(e);
    }

    return (
        <Container {...props} $ratio={ratio} $isCorrect={isCorrect}>
            <Wrapper 
                type={type} 
                value={value} 
                onBlur={handleBlur} 
                onChange={handleChange} 
                placeholder={placeholder} 
                readOnly={readOnly} 
                $ratio={ratio} 
            />
            {postfix && (<Postfix>{postfix}</Postfix>)}
            {isCorrect && (<Postfix>
                <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.25 5L7.65625 15L3.75 10.4545" stroke="#14EAB0" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </Postfix>)}
            {isCorrect === false && (<Postfix>
                <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.47089 5.47088L14.5291 14.5291M14.5291 5.47088L5.47089 14.5291" stroke="#DD3838" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </Postfix>)}
        </Container>
    )
};
