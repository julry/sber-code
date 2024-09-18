import styled from "styled-components";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSizeRatio } from "../../hooks/useSizeRatio";
import arrow from '../../assets/images/icon-arrow.svg';
import { Input } from "./Input";

const Wrapper = styled.div`
    position: relative;
    text-align: left;
    cursor: pointer;
    z-index: ${({$zIndex}) => $zIndex};
`; 

const Postfix = styled.div`
    position: absolute;
    top: 50%;
    right: var(--spacing_x4);
    width: ${({$ratio}) => $ratio * 20}px;
    height: ${({$ratio}) => $ratio * 20}px;
    background: url(${arrow}) no-repeat center center;
    background-size: cover;
    transition: transform 0.3s;
    transform: translateY(-50%) ${({$isOpen}) => $isOpen ? 'rotate(90deg)' : ''};
    z-index: 12;
`;

const InputStyled = styled(Input)`
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2);
    z-index: 11;
    cursor: pointer;

    & input {
        cursor: pointer;
    }
`;

const List = styled(motion.div)`
    position: absolute;
    z-index: 10;
    top: calc(100% - ${({$ratio}) => $ratio * 10}px);
    left: 0;
    right: 0;
    background: white;
    border-radius: 0 0 var(--border-radius-sm) var(--border-radius-sm);
    color: #000000;
    border-top: 1px solid #D9D9D9;
    padding: ${({$ratio}) => $ratio * 10}px ${({$ratio}) => $ratio * 7}px 0;
    overflow: hidden;
`;

const Option = styled.div`
    padding: var(--spacing_small) 0;
    font-size:var(--font_sm);
    cursor: pointer;

    & + & {
        border-top: 1px solid rgba(0,0,0,0.2);
    }
`;

export const Select = ({onChoose, options, placeholder, zIndex, ...props}) => {
    const [value, setValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const ratio = useSizeRatio();

    const handleChoose = (e, id, name) => {
        e.stopPropagation();
        onChoose?.(id, name);
        setValue(name);
        setIsOpen(false);
    };

    return (
        <Wrapper {...props} $zIndex={zIndex} onClick={() => setIsOpen(prev => !prev)} $ratio={ratio} $isOpen={isOpen}>
            <InputStyled readOnly value={value.length > 0 ? value : placeholder} />
            <Postfix $isOpen={isOpen} $ratio={ratio}/>
            <AnimatePresence>
                {
                    isOpen && (
                        <List
                            $ratio={ratio}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            {options.map(({id, name}) => (
                                <Option key={id} onClick={(e) => handleChoose(e, id, name)} $ratio={ratio}>{name}</Option>
                            ))}
                        </List>
                    )
                }
            </AnimatePresence>
        </Wrapper>
    )
}