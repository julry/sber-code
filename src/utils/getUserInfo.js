export const getUserInfo = async (email) => {
    let userInfo = {};
    let passedWeeks = [];
    let points = 0;
    let weekPoints = 0;
    let vipPoints = 0;

    try {
        // const record = await ftClient.finddata({ email });
        // const {data, uuid} = record;
        const uuid = 12313132;
        const data = {
            id: '13526413',
            name: 'Иванов Иван',
            email: 'ivan2001@mail.ru',
            university: 'ННГУ им. Лобачевского',
            fac: 'Факультет химических технологий, промышленной экологии и биотехнологий',
            isTarget: true,
            seenRules: false,
            isTgConnected: false,
            weekTickets: '',
            weekTips1: 0,
            weekTips2: 0,
            weekTips3: 0,
            weekTips4: 0,
            seenWeekInfo: false,
            registerWeek: 1,
            points: 0,
            weekPoints: 0,
            targetPoints: 0,
            passedWeeks: '',
            seenInfo: false
        };

        userInfo = {
            recordId: uuid,
            id: data.id,
            name: data.name,
            email,
            university: data.university,
            fac: data.fac,
            isVip: data.isTarget,
            seenRules: data.seenRules,
            isTgConnected: data.isTgConnected,
            weekTickets: data.weekTickets.replace(' ', '').split(',').map((l) => +l.trim()),
            weekTips: {
                1: data.weekTips1,
                2: data.weekTips2,
                3: data.weekTips3,
                4: data.weekTips4,
            },
            registerWeek: data.registerWeek,
        };

        passedWeeks = data.passedWeeks.replace(' ', '').split(',').map((l) => +l.trim());
        points = data.points;
        weekPoints = data.weekPoints;
        vipPoints = data.targetPoints;

        return { userInfo, passedWeeks, points, weekPoints, vipPoints };
    }
    catch (e) {
        return { isError: true };
    }
}