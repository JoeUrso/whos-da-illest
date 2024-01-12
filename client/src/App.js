import {
    Navigate,
    Route,
    BrowserRouter as Router,
    Routes,
} from "react-router-dom";
import "./App.scss";
import { useBattleContext } from "./context/GameContext";
import BattleStart from "./pages/BattleStart/BattleStart";
import GradeRapper from "./pages/GradeRapper/GradeRapper";
import HomePage from "./pages/HomePage/HomePage";
import Results from "./pages/Results/Results";

function App() {
    const { rapper1, rapper2 } = useBattleContext();

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />

                <Route
                    path="/battle"
                    element={<Navigate replace to="/battle/:battleId" />}
                />
                <Route
                    path="/battle/:battleId/start"
                    element={<BattleStart />}
                />
                <Route
                    path="/battle/:battleId/rapper1"
                    element={<GradeRapper rapper={rapper1} />}
                />
                <Route
                    path="/battle/:battleId/rapper2"
                    element={<GradeRapper rapper={rapper2} />}
                />
                <Route path="/battle/:battleId/results" element={<Results />} />
            </Routes>
        </Router>
    );
}
export default App;
