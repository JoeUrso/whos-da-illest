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
                <Route
                    exact
                    path="/"
                    component={HomePage} // homepage
                />

                <Redirect exact from="/battle" to="/battle/:battleId" />

                <Route path="/battle/:battleId" component={BattlePage} />

                {/* <Route
                        path="/battles/:id/:rapperId"
                        component={ArtistGrade} //artist grade
                    />

                    <Route
                        path="/battles/:id/results"
                        component={BattleResults} //battle results
                    />  */}
            </Switch>
        </Router>
    );
}
export default App;
