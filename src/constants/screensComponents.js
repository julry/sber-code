import { Intro } from "../components/screens/Intro";
import { Lobby } from "../components/screens/Lobby";
import { Login } from "../components/screens/Login";
import { Registration1 } from "../components/screens/Registration1";
import { Registration2 } from "../components/screens/Registration2";
import { Start } from "../components/screens/Start";

import { SCREENS } from "./screens";
import { VipStart } from "../components/screens/VipStart";
import { Start2 } from "../components/screens/Start2";
import { Game1 } from "../components/screens/Game1";
import { Game2 } from "../components/screens/Game2";

import door from '../assets/images/door.png';
import doorLocked from '../assets/images/doorLocked.png';
import game from '../assets/images/game.png';
import intro from '../assets/images/intro.png';
import lobby from '../assets/images/lobby.png';
import start1 from '../assets/images/start1.png';
import start2 from '../assets/images/start2.png';
import tip from '../assets/images/tip.png';
import tip21 from '../assets/images/tip21.png';
import tip22 from '../assets/images/tip22.png';
import tip23 from '../assets/images/tip23.png';
import reg from '../assets/images/reg.png';

export const screens = {
    [SCREENS.INTRO]: Intro,
    [SCREENS.REG_1]: Registration1,
    [SCREENS.REG_2]: Registration2,
    [SCREENS.LOGIN]: Login,
    [SCREENS.VIP_START]: VipStart,
    [SCREENS.START]: Start,
    [SCREENS.START2]: Start2,
    [SCREENS.LOBBY]: Lobby,
    [SCREENS.GAME1]: Game1,
    [SCREENS.GAME2]: Game2,
};

export const preloadImages = [game,door, doorLocked, intro, lobby, start1, start2, tip, tip21, tip22, tip23, reg];
