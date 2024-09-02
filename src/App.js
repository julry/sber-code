import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {ProgressProvider} from "./contexts/ProgressContext";
import {ScreenTemplate} from "./components/ScreenTemplate";
import {ScreenContent} from "./components/ScreenContent";

export function App() {
    return (
        <ProgressProvider>
            <ScreenTemplate>
                <ScreenContent />
            </ScreenTemplate>
        </ProgressProvider>
    );
};
