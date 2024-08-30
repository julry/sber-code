// import { Game1 } from "../components/screens/Game1";
import { Intro } from "../components/screens/Intro";
import { Lobby } from "../components/screens/Lobby";
import { Login } from "../components/screens/Login";
import { Registration1 } from "../components/screens/Registration1";
import { Registration2 } from "../components/screens/Registration2";
import { Start } from "../components/screens/Start";

import { SCREENS } from "./screens";
import { VipStart } from "../components/screens/VipStart";
import { Start2 } from "../components/screens/Start2";

export const screens = {
    [SCREENS.INTRO]: Intro,
    [SCREENS.REG_1]: Registration1,
    [SCREENS.REG_2]: Registration2,
    [SCREENS.LOGIN]: Login,
    [SCREENS.VIP_START]: VipStart,
    [SCREENS.START]: Start,
    [SCREENS.START2]: Start2,
    // [SCREENS.WEEK1]: Week1,
    // [SCREENS.WEEK2]: Week2,
    [SCREENS.LOBBY]: Lobby,
    // [SCREENS.LOBBY2]: Lobby2,
    // [SCREENS.LOBBY3]: Lobby3,
    // [SCREENS.LOBBY4]: Lobby4,
    // [SCREENS.GAME1_1]: Game11,
    // [SCREENS.GAME1_2]: Game12,
    // [SCREENS.GAME1_3]: Game13,
    // [SCREENS.POST_GAME1]: PostGame1,
    // [SCREENS.POST_LEVEL1_1]: PostLevel11,
    // [SCREENS.POST_LEVEL1_2]: PostLevel12,
    // [SCREENS.POST_LEVEL1_3]: PostLevel13,
    // [SCREENS.LIBRARY1]: Library1,
    // [SCREENS.GAME2_1]: Game21,
    // [SCREENS.GAME2_2]: Game22,
    // [SCREENS.GAME2_3]: Game23,
    // [SCREENS.POST_GAME2]: PostGame2,
    // [SCREENS.POST_LEVEL2_1]: PostLevel21,
    // [SCREENS.POST_LEVEL2_2]: PostLevel22,
    // [SCREENS.POST_LEVEL2_3]: PostLevel23,
    // [SCREENS.LIBRARY2]: Library2,
    // [SCREENS.PROFILE]: Profile,
};

export const preloadImages = [];
