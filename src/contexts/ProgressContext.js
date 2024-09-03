import {createContext, useContext, useState} from 'react'
import {SCREENS, NEXT_SCREENS} from "../constants/screens";
import {screens} from "../constants/screensComponents";
import {getUrlParam} from "../utils/getUrlParam";

const INITIAL_USER = {
    id: '13526413',
    name: 'Иванов Иван',
    email: 'ivan2001@mail.ru',
    university: 'ННГУ им. Лобачевского',
    fac: 'Факультет химических технологий, промышленной экологии и биотехнологий',
    isVip: true,
    seenRules: false,
    isTgConnected: false,
    weekTickets: [],
    //send after each opened tip
    weekTips: {1: 0, 2: 0, 3: 0, 4: 0},
    isJustEntered: false,
    registerWeek: 2,
};


const USER = {
    id: '13526413',
    name: 'Иванов Иван',
    email: 'ivan2001@mail.ru',
    university: 'ННГУ им. Лобачевского',
    fac: 'Факультет химических технологий, промышленной экологии и биотехнологий',
    isTarget: true,
    seenRules: false,
    isTgConnected: false,
    weekTickets: '1, 2, 3',
    weekTips1: 0,
    weekTips2: 0,
    weekTips3: 0,
    weekTips4: 0,
    registerWeek: 1,
    points: 0,
    weekPoints: 0,
    targetPoints: 0,
    passedWeeks: '1, 2, 3',
    // currentWeek: 3 ?
};

const getCurrentWeek = () => {
    const today = new Date();

    if (today < new Date(2024, 8, 16)) return 1;
    if (today < new Date(2024, 8, 23)) return 2;
    if (today < new Date(2024, 8, 30)) return 3;

    return 4;
}

export const CURRENT_WEEK = getCurrentWeek();

const INITIAL_STATE = {
    screen: SCREENS.INTRO,
    points: 0,
    vipPoints: 0,
    weekPoints: 0,
    user: INITIAL_USER,
    passedWeeks: [],
}

const ProgressContext = createContext(INITIAL_STATE);

export function ProgressProvider(props) {
    const {children} = props
    const [currentScreen, setCurrentScreen] = useState(getUrlParam('screen') || INITIAL_STATE.screen);
    // points za igru, сюда добавляем набранные общие звезды 
    const [points, setPoints] = useState(INITIAL_STATE.points);
    // points za недели, сюда добавляем набранные красные звезды для випов
    const [vipPoints, setVipPoints] = useState(INITIAL_STATE.vipPoints);
    const [modal, setModal] = useState({visible: false, type: 'postLevel', week: 1});
    // points za неделю, сюда добавляем набранные белые звезды для випов
    const [weekPoints, setWeekPoints] = useState(INITIAL_STATE.weekPoints);
    const [user, setUser] = useState(INITIAL_STATE.user);
    const [passedWeeks, setPassedWeeks] = useState(INITIAL_STATE.passedWeeks);
    const screen = screens[currentScreen];

    const next = (customScreen) => {
        const nextScreen = customScreen ?? NEXT_SCREENS[currentScreen]

        if (!nextScreen) {
            return
        }

        setCurrentScreen(nextScreen)
    }

    const setUserInfo = (user) => {
        setUser(prev => ({...prev, ...user}));
    }

    const state = {
        screen,
        currentScreen,
        points,
        next,
        setUserInfo, 
        user,
        weekPoints,
        vipPoints,
        setModal,
        setVipPoints,
        setWeekPoints,
        setPoints,
        modal,
        passedWeeks,
        setPassedWeeks,
    }

    return (
        <ProgressContext.Provider value={state}>
            {children}
        </ProgressContext.Provider>
    )
}

export function useProgress() {
    return useContext(ProgressContext)
}
