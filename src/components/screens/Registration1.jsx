import styled from "styled-components";
import { Button } from "../shared/Button";
import { Select } from "../shared/Select";
import reg from '../../assets/images/reg.png';
import { useProgress } from "../../contexts/ProgressContext";
import { useState } from "react";
import { faculties, universities } from "../../constants/universities";
import { FlexWrapper } from "../shared/FlexWrapper";

const Wrapper = styled(FlexWrapper)`
    padding: calc( 2 * var(--spacing_x5)) var(--spacing_x4);
`;

const ButtonStyled = styled(Button)`
    margin-top: auto;
`;

const Picture = styled.div`
    position: absolute;
    inset: 0;
    background: url(${reg}) no-repeat center 100% / cover;
`;

const Text = styled.p`
    margin-bottom: var(--spacing_x5);
    text-align: center;
`;

const SelectStyled = styled(Select)`
    margin-top: var(--spacing_small);
`;

export const Registration1 = () => {
    const [univ, setUniv] = useState({});
    const [fac, setFac] = useState('');
    const { next, setUserInfo } = useProgress();

    const handlePicUniversity = (id, name) => {
        if (univ?.id === id) return;
        
        setUniv({id, name});
        setFac('');
    }

    const handleNext = () => {
        setUserInfo({university: `${univ.name}${!fac && fac !== 'Другое' ? ' — ' + fac : ''}`, isVip: !!fac && fac !== 'Другое'});
        next();
    }

    const btnDisabled = !univ?.id || (univ.id !== 'other' && !fac);

    return (
        <Wrapper>
                <Text>
                    Укажи свой вуз и факультет: обрати внимание, что для получения призов тебе нужно будет взять с собой свой студенческий билет.
                </Text>
                <Picture/>
                <Select options={universities} placeholder="Вуз" onChoose={handlePicUniversity} zIndex={2}/>
                {univ?.id && univ.id !== 'other' && (
                    <SelectStyled 
                        placeholder="Факультет"
                        zIndex={1}
                        options={faculties.filter(({university}) => university === univ.id || university === 'all')}
                        onChoose={(_, name) => setFac(name)}
                    />
                )}
                <ButtonStyled color="green" onClick={handleNext} disabled={btnDisabled}>Далее</ButtonStyled>
        </Wrapper>
    )
}