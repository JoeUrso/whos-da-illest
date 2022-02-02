import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";
import "./App.scss";
import BattlePage from "./pages/BattlePage/BattlePage";
import HomePage from "./pages/HomePage/HomePage";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage} />

                <Redirect exact from="/battle" to="/battle/:battleId" />

                <Route path="/battle/:battleId" component={BattlePage} />
            </Switch>
        </Router>
    );
}
export default App;
