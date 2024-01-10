import {
    Navigate,
    Route,
    BrowserRouter as Router,
    Routes,
} from "react-router-dom";
import "./App.scss";
import BattlePage from "./pages/BattlePage/BattlePage";
import HomePage from "./pages/HomePage/HomePage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />

                <Route
                    path="/battle"
                    element={<Navigate replace to="/battle/:battleId" />}
                />

                <Route path="/battle/:battleId" element={<BattlePage />} />
            </Routes>
        </Router>
    );
}
export default App;
