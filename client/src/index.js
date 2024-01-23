import { ClerkProvider } from "@clerk/clerk-react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GameProvider } from "./context/GameContext";

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
}

ReactDOM.render(
    <React.StrictMode>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <GameProvider>
                <App />
            </GameProvider>
        </ClerkProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
