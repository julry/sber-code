import styled from "styled-components";
import { useSizeRatio } from "../../hooks/useSizeRatio";

const Container = styled.div`
    position: relative;
    width: ${({$ratio}) => $ratio * 274}px;
    border-radius: var(--border-radius-sm);
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
    top: var(--spacing_small);
    right: var(--spacing_small);
    width: var(--icon_size);
    height: var(--icon_size);
`;

export const Input = ({value, onChange, type, postfix, readOnly, placeholder, ...props}) => {
    const ratio = useSizeRatio();

    return (
        <Container {...props} $ratio={ratio}>
            <Wrapper type={type} value={value} onChange={onChange} placeholder={placeholder} readOnly={readOnly} $ratio={ratio} />
            {postfix && (<Postfix>{postfix}</Postfix>)}
        </Container>
    )
};
