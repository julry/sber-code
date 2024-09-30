import styled from "styled-components";
import {uid} from "uid";
import { SCREENS } from "../../constants/screens";
import { Button } from "../shared/Button";
import { Input } from "../shared/Input";
import reg from '../../assets/images/reg2.png';
import { useProgress } from "../../contexts/ProgressContext";
import { useState } from "react";
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { FlexWrapper } from "../shared/FlexWrapper";
import { emailRegExp } from "../../constants/regexp";

const Wrapper = styled(FlexWrapper)`
    padding: calc(2 * var(--spacing_x5)) var(--spacing_x4);
    background: url(${reg}) no-repeat center 100% / cover;

`;

const Text = styled.p`
    margin-bottom: ${({$ratio}) => $ratio * 15}px;
    text-align: center;
    width: ${({$ratio}) => $ratio * 286}px;
`;

const InputStyled = styled(Input)`
    margin-top: var(--spacing_small);

    & input {
        padding-top: var(--spacing_x2);
        padding-bottom: var(--spacing_x2);
    }
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
    position: relative;
    z-index: 10;
    display: flex;
    align-items: flex-start;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.8);
    text-align: left;
    margin-top: var(--spacing_x4);
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

const IncorrectText = styled.p`
    width: ${({$ratio}) => $ratio * 274}px;
    font-size: var(--font_xs);
    margin-top: var(--spacing_x1);
`;

const Enter = styled(Button)`
    background: transparent;
    border: none;
    width: auto;
    padding: 0 1px 0 ${({$ratio}) => $ratio * 3}px;
    border-radius: 0;
    border-bottom: 1px solid white;
    margin-top: ${({$ratio}) => $ratio * 15}px;
`;

const SmallText = styled.p`
    position: relative;
    z-index: 10;
    margin-top: var(--spacing_small);
    font-size: var(--font_xs);
`;

const IdText = styled.p`
    margin-top: var(--spacing_small);
`;

export const Registration2 = () => {
    const ratio = useSizeRatio();
    const [isSending, setIsSending] = useState(false);
    const [refId, setRefId] = useState('');
    const { next, setUserInfo, user, registrateUser, getUserInfo, currentWeek } = useProgress();
    const [isAlreadyHas, setIsAlreadyHas] = useState(false);
    const [isNetworkError, setIsNetworkError] = useState(false);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [isAgreed, setIsAgreed] = useState('');

    const handleClick = async () => {
        if (isSending) return;
        setIsSending(true);
        const id = uid(7);
        const info = await getUserInfo(email.toLowerCase().trim());
        if (info && !info?.isError) {
            setIsAlreadyHas(true);
            setIsSending(false);

            return;
        }

        setUserInfo({name: `${name} ${surname}`, email: email.toLowerCase(), registerWeek: currentWeek, id});
        const regInfo = await registrateUser({name: `${name} ${surname}`, email: email.toLowerCase().trim(), id, refId});

        if (regInfo?.isError) {
            setIsNetworkError(true);
            setIsSending(false);

            return;
        }
        setIsSending(false);

        if (user.isVip) next(SCREENS.VIP_START);
        next(SCREENS.START);
    }

    const handleEnter = async () => {
        if (isSending) return;
        next(user.seenInfo ? SCREENS.LOBBY : SCREENS.START);
    }

    const link = user.isVip ? 'https://sber-cryptography.fut.ru/agreement_ff.pdf' : 'https://sber-cryptography.fut.ru/agreement.pdf';
    return (
        <Wrapper>
            <Text $ratio={ratio}>
                Каждую неделю будет открываться новый шифр, который приблизит тебя к разгадке главной тайны.
            </Text>
            <Text $ratio={ratio}>
                Чтобы отслеживать прогресс, заполни свои реальные данные:
            </Text>
            <Input
                type="text" 
                value={surname} 
                onChange={(e) => setSurname(e.target.value)} 
                checkCorrect={() => surname.length > 0}
                placeholder="Фамилия"
            />
            <InputStyled 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                checkCorrect={() => name.length > 0}
                placeholder="Имя"
            />
            <InputStyled 
                type="email" 
                placeholder="E-mail"
                value={email} 
                checkCorrect={() => !!email.match(emailRegExp) && !isAlreadyHas}
                onChange={(e) => setEmail(e.target.value)} 
            />
            {isAlreadyHas && (
                <IncorrectText $ratio={ratio}>
                    Такая почта уже зарегистрирована. Попробуй ввести ещё раз или войди, чтобы разгадывать шифры.
                </IncorrectText>
            )}
            <IdText>
                Введи ID друга,{'\n'}который тебя пригласил
            </IdText>
            <InputStyled 
                type="text" 
                value={refId} 
                onChange={(e) => setRefId(e.target.value)} 
                checkCorrect={() => true}
                placeholder="ID"
            />
            <SmallText> 
                После регистрации ты тоже{'\n'}сможешь пригласить друзей в игру
            </SmallText>
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
                    <Link
                        href={"https://doc.fut.ru/personal_data_policy.pdf"}
                        target="_blank"
                    >
                    обработку персональных данных
                    </Link>{" "}
                    {" "}и получение информационных сообщений, а также с{"\u00A0"}
                    <Link href={link} target="_blank">правилами проведения акции</Link>.
                </span>
            </RadioButtonLabel>
            {isNetworkError  && (
                <IncorrectText $ratio={ratio}>
                    Что-то пошло не так. Попробуй позже.
                </IncorrectText>
            )}
            <ButtonStyled 
                color="green" 
                onClick={handleClick} 
                disabled={!name || !email || !surname || !isAgreed || isSending || !email.match(emailRegExp) || isAlreadyHas}
            >
                Отправить
            </ButtonStyled>
            {
                isAlreadyHas && (
                    <Enter $ratio={ratio} onClick={handleEnter}>Войти</Enter>
                )
            }
        </Wrapper>
    )
}