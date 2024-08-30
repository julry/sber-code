import { useState } from "react";
import styled from "styled-components";
import { useProgress } from "../../../contexts/ProgressContext";
import { useSizeRatio } from "../../../hooks/useSizeRatio";
import { Block } from "../Block";
import { Button } from "../Button";
import {Modal} from './Modal';

const Darken = styled.div`
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at ${({$left}) => $left} ${({$top}) => $top}px, rgba(0, 0, 0, 0) 0, rgba(0,0,0, 0.85) ${({$radius}) => $radius}px);
`;

const BlockStyled = styled(Block)`
    position: absolute;
    top: ${({$ratio, $isBottom}) => $isBottom ? 'auto' : $ratio * 99}px;
    bottom: ${({$ratio, $isBottom}) => $isBottom ? $ratio * 70 : 'auto'}px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 5;
    text-align: center;
    padding-left: var(--spacing_x5);
    padding-right: var(--spacing_x5);
`;

const ButtonStyled = styled(Button)`
    margin-top: var(--spacing_x5);
`;

const TextStyled = styled.p`
    font-size: var(--font_md);
`;

const List = styled.div`
    padding-left: var(--spacing_x3);
    text-align: left;

    & li::marker {
        font-size: var(--font_sm);
    }
`;

const ProgressWrapper = styled.div`
    position: absolute;
    bottom: calc(var(--spacing_x5) + var(--spacing_small));
    left: var(--spacing_x4);
    right: var(--spacing_x4);
    border-radius: calc(var(--spacing_x5) * 3);
    height: var(--spacing_x5);
    background-color: var(--color-white);
    overflow: hidden;
    z-index: 3;
`;

const Progress = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: calc((100% / ${({$amount}) => $amount}) * ${({$part}) => $part});
    border-radius: calc(var(--spacing_x5) * 3);
    overflow: hidden;
    z-index: 3;
    transition: width 0.3s;
    background: var(--color-green2);
`;

export const FirstRulesModal = (props) => {
    const ratio = useSizeRatio();
    const [part, setParts] = useState(0);
    const { user } = useProgress();

    const getProps = () => {
        let top = 44, left, right, radius;

        if (part === 0)  {
            left = `calc(100%  - ${ratio * 44}px)`;
            radius = 30;
        } 

        if (part === 1 && user.isVip) {
            left = 123 * ratio + 'px';
            radius = 110;
        }

        if ((part === 1 && !user.isVip) || (part === 2 && user.isVip)) {
            left = 73 * ratio + 'px';
            radius = 66;
        }

        if (part === 3 && user.isVip) {
            left = 169 * ratio + 'px';
            radius = 66;
        }

        if ((part === 2 && !user.isVip) || (part === 4 && user.isVip)) {
            left = `calc(100%  - ${ratio * 89}px)`;
            radius = 30;
        }
        
        if ((part === 3 && !user.isVip) || (part === 5 && user.isVip)) {
            top = 264;
            left= '50%';
            radius = 189;
        }

        return {
            $left: left ? left : undefined,
            $right: right ? right * ratio : undefined, 
            $top: top * ratio, 
            $radius: radius * ratio,
        }
    }

    const getVipContent = () => {
        let content;
        
        if (part === 0)  {
            content = (
                <p>
                    Тут ты можешь найти <b>все правила</b> игры и розыгрыша
                </p>
            )
        } 

        if (part === 1)  {
            content = (
                <p>
                    Здесь будет показываться, сколько у тебя игровых очков
                </p>
            )
        } 
        
        if (part === 2)  {
            return (
                <BlockStyled hasCloseIcon onClose={() => setParts(prev => prev + 1)} $ratio={ratio}>
                    <List>
                        <ul>
                            <li>
                                За каждый пройденный уровень даётся 3 монетки.
                            </li>
                            <li>
                                За каждую полностью завершённую неделю — 10 монеток.
                            </li>
                            <li>
                                За каждый правильный ответ на вопрос в золотых карточках — 5 монеток.
                            </li>
                        </ul>
                    </List>
                    
                    <br/>
                    <br/>
                    <p>
                        Монетки используются 
                        для <b>еженедельных розыгрышей</b>. {'\n'}
                        Они суммируются в течение недели и в начале следующей сгорают.{'\n\n'}
                        Чтобы участвовать в розыгрыше, нужно набрать <b>минимум 20 монеток</b> за неделю.
                    </p>
                </BlockStyled>
            );
        } 
        
        if (part === 3)  {
            return (
                <BlockStyled $ratio={ratio} hasCloseIcon onClose={() => setParts(prev => prev + 1)}>
                    <p>
                        Листики ты получаешь за первый заход на каждой неделе, когда появляются новые уровни.{' '}
                        Чем больше листиков, тем больше шанс выйграть IPhone 16.{'\n\n'}
                        Чтобы участвовать в розыгрыше, нужно набрать <b>минимум 2 листика</b> за все четыре недели игры.
                    </p>
                </BlockStyled>
            )
        } 
        if (part === 4) {
            content = (
                <p>
                    {'В личном кабинете ты найдёшь персональную информацию и свой ID для розыгрыша, а также сможешь узнать правила начисления игровых очков :)'}
                </p>
            )
        }

        if (part === 5) {
            content = (
                <p>
                    Тут будут показываться все доступные уровни и недели, 
                    а также собранные тобой карточки
                </p>
            )
        }

        return (
            <BlockStyled $isBottom={part===5} $ratio={ratio}>
                {content}
                <ButtonStyled onClick={() =>  part === 5 ? props.onClose() : setParts(prev => prev + 1)}>Далее</ButtonStyled>
            </BlockStyled>
        )
    };

    const getUnvipContent = () => {
        let content;
        if (part === 0)  {
            content = (
                <p>
                    Тут ты можешь найти <b>все правила</b> игры и розыгрыша
                </p>
            )
        } 

        if (part === 1)  {
            content = (
               <>
                    <p>
                        Здесь будет показываться, сколько у тебя монеток
                    </p>
                    <br />
                    <br />
                    <List>
                        <ul>
                            <li>
                                За каждый пройденный уровень даётся 3 монетки.
                            </li>
                            <li>
                                За каждую полностью завершённую неделю — 10 монеток.
                            </li>
                            <li>
                                За каждый правильный ответ на вопрос в золотых карточках — 5 монеток.
                            </li>
                        </ul>
                    </List>
                    <br/>
                    <br/>
                    <TextStyled>Монетки для розыгрыша суммируются в течение всех 4 недель игры.</TextStyled>
               </>
            )
        } 

        if (part === 2) {
            content = (
                <p>
                    {'В личном кабинете ты найдёшь персональную информацию и свой ID для розыгрыша, а также сможешь узнать правила начисления игровых очков :)'}
                </p>
            )
        }

        if (part === 3) {
            content = (
                <p>
                    Тут будут показываться все доступные уровни и недели, 
                    а также собранные тобой карточки
                </p>
            )
        }

        return (
            <BlockStyled $isBottom={part===3} $ratio={ratio}>
                {content}
                <ButtonStyled onClick={() => part === 3 ? props.onClose() : setParts(prev => prev + 1)}>Далее</ButtonStyled>
            </BlockStyled>
        )
    }

    return (
        <Modal isDisabledAnimation>
            <Darken {...getProps()}/>
            {user.isVip ? getVipContent() : getUnvipContent()}
            <ProgressWrapper>
                <Progress $amount={user.isVip ? 6 : 4} $part={part + 1}/>
            </ProgressWrapper>
        </Modal>
    )
}