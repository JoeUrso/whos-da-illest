import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classicScratch from "../../assets/sounds/ClassicScratch.mp3";
import scratch1 from "../../assets/sounds/Scratch1.mp3";
import scratch2 from "../../assets/sounds/Scratch2.mp3";
import watchThis from "../../assets/sounds/WatchThis.mp3";
import BattleStart from "../../components/BattleStart/BattleStart";
import { postGrade, updateBattleAndRapper } from "../utils/api";
import "./BattlePage.scss";

const API_URL = process.env.API_URL || "http://localhost:8080";

export default function BattlePage() {
    const watchThisAudio = new Audio(watchThis);
    const scratch1Audio = new Audio(scratch1);
    const scratch2Audio = new Audio(scratch2);
    const classicScratchAudio = new Audio(classicScratch);

    const scrollToTopRef = useRef();
    const navigate = useNavigate();
    const { battleId } = useParams();

    const scrollHandler = () => {
        scrollToTopRef.current?.scrollIntoView({ behavior: "auto" });
    };

    const startBattle = () => {
        // scrollHandler();
        watchThisAudio.play();
        navigate(`/battle/${battleId}/rapper1`);
    };

    const passTheMic = (grade) => {
        // scrollHandler();
        scratch1Audio.play();
        navigate(`/battle/${battleId}/rapper2`);
    };

    const dropTheMic = (grade) => {
        // scrollHandler();
        scratch2Audio.play();
        navigate(`/battle/${battleId}/results`);
    };

    const backToBattles = async (rapper1Grade, rapper2Grade, winner) => {
        // scrollHandler();
        classicScratchAudio.play();

        await postGrade(rapper1Grade, battle.rapper1_id);
        await postGrade(rapper2Grade, battle.rapper2_id);
        await updateBattleAndRapper(winner, battle, rapper1, rapper2);

        navigate("/");
    };

    return (
        <>
            <BattleStart
                scrollToTop={scrollToTopRef}
                startBattle={startBattle}
            />
        </>
    );
}
