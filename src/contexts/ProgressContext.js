import { FTClient } from 'ft-client';
import {createContext, useContext, useEffect, useRef, useState} from 'react'
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
    seenInfo: false,
    isTgConnected: true,
    // weekTickets: [1,2,3],
    weekTickets: [],
    weekTips: {1: 0, 2: 0, 3: 0, 4: 0},
    isJustEntered: false,
    registerWeek: 2,
};

const getCurrentWeek = () => {
    const today = new Date();

    if (today < new Date(2024, 8, 23)) return 1;
    if (today < new Date(2024, 8, 30)) return 2;
    if (today < new Date(2024, 9, 7)) return 3;
    if (today < new Date(2024, 9, 14)) return 4;

    return 5;
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

const API_LINK = 'https://ft-admin-api.sjuksin.ru/';

export function ProgressProvider(props) {
    const {children} = props
    const [currentScreen, setCurrentScreen] = useState(getUrlParam('screen') || INITIAL_STATE.screen);
    // const [currentScreen, setCurrentScreen] = useState(INITIAL_STATE.screen);
    // points za igru, сюда добавляем набранные общие звезды 
    const [points, setPoints] = useState(INITIAL_STATE.points);
    // points za недели, сюда добавляем набранные красные звезды для випов
    const [vipPoints, setVipPoints] = useState(INITIAL_STATE.vipPoints);
    const [modal, setModal] = useState({visible: false, type: 'postLevel', week: 1});
    // points za неделю, сюда добавляем набранные белые звезды для випов
    const [weekPoints, setWeekPoints] = useState(INITIAL_STATE.weekPoints);
    const [user, setUser] = useState(INITIAL_STATE.user);
    const [passedWeeks, setPassedWeeks] = useState(INITIAL_STATE.passedWeeks);
    const [currentWeek, setCurrentWeek] = useState(CURRENT_WEEK);
    const screen = screens[currentScreen];

    const next = (customScreen) => {
        const nextScreen = customScreen ?? NEXT_SCREENS[currentScreen]

        if (!nextScreen) {
            return
        }

        setCurrentScreen(nextScreen)
    }

    const client = useRef();

    const getDbCurrentWeek = async () => {
        const { week } = await client.current.loadProjectState();
        if (week && !isNaN(+week)) {
            setCurrentWeek(+week);
        }
    }

    useEffect(() => {
        client.current = new FTClient(
            API_LINK,
            'sber'
        )
        try {
            getDbCurrentWeek();
        } catch (e) {
            console.log(e);
        }
    }, []);


    const setUserInfo = (user) => {
        setUser(prev => ({...prev, ...user}));
    }

    const updateUser = async (changed) => {
        const { 
            isVip, recordId, weekTickets, id, name, email, registerWeek, weekTips, refId,
            university, isTgConnected, seenInfo, week1Points, week2Points, week3Points, week4Points,
        } = user;

        if (!recordId) return;

        const data = {
            id,
            name,
            email,
            refId,
            university,
            isTarget: isVip,
            isTgConnected: isTgConnected,
            weekTickets: weekTickets.join(','),
            weekTips: Object.values(weekTips).join(','),
            points,
            targetPoints: vipPoints,
            week1Points, 
            week2Points, 
            week3Points, 
            week4Points,
            [`week${currentWeek > 4 ? 4 : currentWeek}Points`]: weekPoints,
            seenInfo, 
            registerWeek,
            passedWeeks: passedWeeks.join(','),
            ...changed,
        };

        try {
            const result = await client.current.updateRecord(recordId, data);

            return result;
        } catch (e) {
            console.log(e);

            return {...data, isEror: true};
        }
    }

    const registrateUser = async ({id, name, email, refId}) => {
        const data = {
            id,
            name,
            email,
            refId,
            university: user.university,
            isTarget: user.isVip,
            points: 0,
            [`week${currentWeek}Points`]: 0,
            targetPoints: 0,
            isTgConnected: false,
            seenInfo: false,
            registerWeek: currentWeek,
            weekTickets: '',
            passedWeeks: '',
            weekTips: '',
        };

        const userInfo = {
            id,
            name,
            email,
            university: user.university,
            isVip: user.isVip,
            isTgConnected: false,
            seenInfo: false,
            registerWeek: currentWeek,
            weekTickets: [],
            weekTips: {1: 0, 2: 0, 3: 0, 4: 0},
            week1Points: 0,
            week2Points: 0,
            week3Points: 0,
            week4Points: 0,
            refId,
        };

       try {
            const record = await client?.current.createRecord(data);
            setUser({...userInfo, recordId: record.id});
            setPoints(INITIAL_STATE.points);
            setVipPoints(INITIAL_STATE.vipPoints);
            setWeekPoints(INITIAL_STATE.weekPoints);
            setPassedWeeks(INITIAL_STATE.passedWeeks);
       } catch (e) {
            return {isError: true}
       }
    };

    const getUserInfo = async (email, isAfterTg) => {
       try {
            const record = await client?.current.findRecord('email', email);
            if (!record) return {isError: true}; 
            const {data, id} = record;
            let userInfo = {};
            const weekTips = {1: 0, 2: 0, 3: 0, 4: 0};
            if (data.weekTips?.length > 0) {
                const tips = data.weekTips.replace(' ', '').split(',');
                tips.forEach((tip, ind) => weekTips[ind + 1] = +(tip.trim()));
            }
            userInfo = {
                recordId: id,
                id: data.id,
                name: data.name,
                email,
                refId: data.refId,
                university: data.university,
                fac: data.fac,
                isVip: data.isTarget,
                seenInfo: data.seenInfo,
                isTgConnected: data.isTgConnected,
                weekTickets: data.weekTickets.length > 0 ? data.weekTickets.replace(' ', '').split(',').map((l) => +l.trim()) : [],
                weekTips,
                registerWeek: data.registerWeek,
                week1Points: data.week1Points, 
                week2Points: data.week2Points,  
                week3Points: data.week3Points, 
                week4Points: data.week4Points, 
            };

            if (isAfterTg) {
                setUser(prev=> ({...prev, isTgConnected: data.isTgConnected}));
                setPoints(data?.points ?? 0);
                setVipPoints(data?.targetPoints ?? 0);

                return;
            }

            setUser(userInfo);
            const passed = data?.passedWeeks?.length > 0 ? data.passedWeeks.replace(' ', '').split(',').map((l) => +l.trim()) : [];
            setPassedWeeks(passed);
            setPoints(data?.points ?? 0);
            setVipPoints(data?.targetPoints ?? 0);
            setWeekPoints(data?.[`week${currentWeek > 4 ? 4 : currentWeek}Points`] ?? 0);

            return {userInfo, passed};
       } catch (e) {
            console.log(e);
            return {isError: true}
       }
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
        currentWeek,
        updateUser,
        registrateUser,
        getUserInfo,
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
