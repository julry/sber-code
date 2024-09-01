import { 
    ProfileModal,
    CoinsRulesModal,
    TgModal,
    LobbyRulesModal,
    DoorInfoModal,
    ExitModal,
    FinishInfoModal,
    RefreshCoinsModal,
    WaitModal,
    NewWeekModal,
    PostLevelModal,
} from "../components/shared/modals";

export const getModalByType = (type) => {
    let Component;

    switch(type) {
        case 'profile':
            Component = ProfileModal;
            break;
        case 'points': 
            Component = CoinsRulesModal;
            break;
        case 'lobbyRules':
            Component = LobbyRulesModal;
            break;
        case 'week':
            Component = DoorInfoModal;
            break;
        case 'exit':
            Component = ExitModal;
            break;
        case 'tg':
            Component = TgModal;
            break;
        case 'finishWeek':
            Component = FinishInfoModal;
            break;
        case 'refresh':
            Component = RefreshCoinsModal;
            break;
        case 'wait':
            Component = WaitModal;
            break;
        case 'newWeek':
            Component = NewWeekModal;
            break;
        case 'postLevel':
            Component = PostLevelModal;
            break;
        default:
            return;
    }

    return <Component />
} 