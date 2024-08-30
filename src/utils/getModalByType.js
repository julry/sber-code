import { 
    PrizesModal,
    TgModal
} from "../components/shared/modals";

export const getModalByType = (type) => {
    let Component;

    switch(type) {
        // case 'profile':
        //     Component = ProfileModal;
        //     break;
        // case 'whiteStar':
        //     Component = WhiteStarModal;
        //     break;
        // case 'redStar':
        //     Component = RedStarModal;
        //     break;  
        // case 'exit':
        //     Component = ExitModal;
        //     break;
        // case 'win':
        //     Component = WinModal;
        //     break;
        // case 'cardRules':
        //     Component = CardRulesModal;
        //     break;
        // case 'info':
        //     Component = InfoModal;
        //     break;
        // case 'refreshStars':
        //     Component = RefreshStarsModal;
        //     break;
        case 'tg':
            Component = TgModal;
            break;
        case 'prizes':
            Component = PrizesModal;
            break; 
        default:
            return;
    }

    return <Component />
} 