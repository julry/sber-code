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
    TipsInfoModal,
    TipsRulesModal,
    TipsModal,
    LoseModal,
    WinModal,
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
        case 'tipsRules':
            Component = TipsRulesModal;
            break; 
        case 'tips': 
            Component = TipsModal;
            break;
        case 'tipsInfo': 
            Component = TipsInfoModal;
            break;
        case 'lose': 
            Component = LoseModal;
            break;
        case 'win': 
            Component = WinModal;
            break;
        default:
            return;
    }

    return <Component />
} 