import styled from "styled-components";
import { SCREENS } from "../../constants/screens";
import { Button } from "../shared/Button";
import { Input } from "../shared/Input";
import reg from '../../assets/images/reg.png';
import { CURRENT_WEEK, useProgress } from "../../contexts/ProgressContext";
import { useState } from "react";
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { FlexWrapper } from "../shared/FlexWrapper";

const Wrapper = styled(FlexWrapper)`
    padding: calc(2 * var(--spacing_x5)) var(--spacing_x4);
`;

const Picture = styled.div`
    position: absolute;
    inset: 0;
    background: url(${reg}) no-repeat center 100% / cover;
`;

const Text = styled.p`
    margin-bottom: var(--spacing_x5);
    text-align: center;
    width: ${({$ratio}) => $ratio * 274}px;
`;

const InputStyled = styled(Input)`
    margin-top: var(--spacing_small);
`;

const ButtonStyled = styled(Button)`
    margin-top: auto;
`;

const InputRadioButton = styled.input`
  display: none;
`;

const RadioIconStyled = styled.div`
  position: relative;
  flex-shrink: 0;
  width: var(--spacing_x4);
  height: var(--spacing_x4);
  background-color: transparent;
  box-shadow: inset 0 0 0 2px #14EAB0;
  border-radius: var(--border-radius-xs);
  margin-right: var(--spacing_small);
`;

const RadioButtonLabel = styled.label`
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  text-align: left;
  margin-top: var(--spacing_x5);
  width: ${({$ratio}) => $ratio * 274}px;
  font-size: ${({$ratio}) => $ratio * 11}px;

  & ${InputRadioButton}:checked + ${RadioIconStyled}{
    background: #14EAB0;
  }

  & ${InputRadioButton}:checked + ${RadioIconStyled}::after {
    content: '';
    position: absolute;
    top: ${({$ratio}) => $ratio * 9}px;
    left: ${({$ratio}) => $ratio * 2}px;
    width: ${({$ratio}) => $ratio * 6}px;
    height: ${({$ratio}) => $ratio * 2}px;
    transform: rotate(45deg);
    background-color: white;
    border-radius: ${({$ratio}) => $ratio * 5}px;
  }

  & ${InputRadioButton}:checked + ${RadioIconStyled}::before {
    content: '';
    position: absolute;
    top: ${({$ratio}) => $ratio * 3}px;
    right: ${({$ratio}) => $ratio * 5}px;
    width: ${({$ratio}) => $ratio * 2}px;
    height: ${({$ratio}) => $ratio * 11}px;
    transform: rotate(-145deg);
    background-color: white;
    border-radius: ${({$ratio}) => $ratio * 5}px;
  }
`;

const Link = styled.a`
  color: inherit;
`;

export const Registration2 = () => {
    const ratio = useSizeRatio();
    const { next, setUserInfo, user } = useProgress();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [isAgreed, setIsAgreed] = useState('');

    const handleClick = () => {
        setUserInfo({name: `${surname} ${name}`, email, registerWeek: CURRENT_WEEK});
        if (user.isVip) next(SCREENS.VIP_START);
        //send data to serv => user + name, email
        next(SCREENS.START);
    }

    return (
        <Wrapper>
            <Picture />
            <Text $ratio={ratio}>
                Каждую неделю будет открываться новый шифр, который приблизит тебя к разгадке главной тайны. {'\n\n'}
                Чтобы отслеживать прогресс, заполни свои данные:
            </Text>
            <Input
                type="text" 
                value={surname} 
                onChange={(e) => setSurname(e.target.value)} 
                placeholder="Фамилия"
            />
            <InputStyled 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Имя"
            />
            <InputStyled 
                type="email" 
                placeholder="E-mail"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <RadioButtonLabel $ratio={ratio}>
                <InputRadioButton
                    type="checkbox"
                    value={isAgreed}
                    checked={isAgreed}
                    onChange={() => setIsAgreed((prevAgreed) => !prevAgreed)}
                />
                <RadioIconStyled/>
                <span>
                    Я согласен(а) на{"\u00A0"}
                    {/* <Link
                    href={"https://fut.ru/personal_data_policy/"}
                    target="_blank"
                    > */}
                    обработку персональных данных
                    {/* </Link>{" "} */}
                    {" "}и получение информационных сообщений, а также с правилами проведения акции.
                </span>
            </RadioButtonLabel>
            <ButtonStyled color="green" onClick={handleClick} disabled={!name || !email || !isAgreed}>Отправить</ButtonStyled>
        </Wrapper>
    )
}