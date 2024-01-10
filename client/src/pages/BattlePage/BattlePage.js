import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import classicScratch from "../../assets/sounds/ClassicScratch.mp3";
import scratch1 from "../../assets/sounds/Scratch1.mp3";
import scratch2 from "../../assets/sounds/Scratch2.mp3";
import watchThis from "../../assets/sounds/WatchThis.mp3";
import GradeRapper from "../../components/GradeRapper/GradeRapper";
import RapperInfo from "../../components/RapperInfo/RapperInfo";
import Results from "../../components/Results/Results";
import "./BattlePage.scss";

const API_URL = process.env.API_URL || "http://localhost:8080";
const SPOTIFY_URL = "https://api.spotify.com/v1/search?";

export default function BattlePage() {
    const [battle, setBattle] = useState({});
    const [rapper1, setRapper1] = useState({});
    const [rapper2, setRapper2] = useState({});
    const [isInfo, setIsInfo] = useState(false);
    const [isRapper1, setIsRapper1] = useState(false);
    const [isRapper2, setIsRapper2] = useState(false);
    const [isResults, setIsResults] = useState(false);
    const [criteria, setCriteria] = useState([]);
    const [rapper1Grade, setRapper1Grade] = useState(null);
    const [rapper2Grade, setRapper2Grade] = useState(null);
    const [resultsArePosted, setResultsArePosted] = useState(false);

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
        scrollHandler();
        watchThisAudio.play();
        setIsInfo(false);
        setIsRapper1(true);
    };

    const passTheMic = (grade) => {
        scrollHandler();
        scratch1Audio.play();
        setIsRapper1(false);
        setIsRapper2(true);
        setRapper1Grade(grade);
    };

    const dropTheMic = (grade) => {
        scrollHandler();
        scratch2Audio.play();
        setIsRapper2(false);
        setIsResults(true);
        setRapper2Grade(grade);
    };

    const backToBattles = (rapper1Grade, rapper2Grade, winner) => {
        scrollHandler();
        classicScratchAudio.play();
        let newGrade1 = {
            grade: rapper1Grade.toString(),
            rapper_id: battle.rapper1_id.toString(),
        };

        let newGrade2 = {
            grade: rapper2Grade.toString(),
            rapper_id: battle.rapper2_id.toString(),
        };

        axios.post(API_URL + "/grades", newGrade1).then((response) => {});

        axios.post(API_URL + "/grades", newGrade2).then((response) => {});

        if (winner.toLowerCase() === rapper1.name.toLowerCase()) {
            axios
                .patch(API_URL + "/battles/rapper1", battle)
                .then((response) => {});

            axios
                .patch(API_URL + "/rappers/rapper1-wins", battle)
                .then((response) => {});

            axios
                .patch(API_URL + "/rappers/rapper2-losses", battle)
                .then((response) => {});
        } else {
            axios
                .patch(API_URL + "/battles/rapper2", battle)
                .then((response) => {});

            axios
                .patch(API_URL + "/rappers/rapper1-losses", battle)
                .then((response) => {});

            axios
                .patch(API_URL + "/rappers/rapper2-wins", battle)
                .then((response) => {});
        }

        setResultsArePosted(true);
    };

    useEffect(() => {
        let selectedBattleId = parseInt(battleId);

        axios.get(API_URL + "/battles").then((response) => {
            const battles = response.data;
            const foundBattle = battles.find(
                (battle) => battle.id === selectedBattleId
            );

            if (foundBattle) {
                setBattle(foundBattle);
            }
        });

        // HANDLES SPOTIFY INFO
        axios.get(API_URL + "/battles/rapper-data").then((response) => {
            let token = response.data;
            let header = {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            };

            axios
                .get(
                    SPOTIFY_URL +
                        `q=artist:${battle.rapper1_name}` +
                        `&type=artist`,
                    {
                        headers: header,
                    }
                )
                .then((response) => {
                    setRapper1(response.data.artists.items[0]);
                });

            axios
                .get(
                    SPOTIFY_URL +
                        `q=artist:${battle.rapper2_name}` +
                        `&type=artist`,
                    {
                        headers: header,
                    }
                )
                .then((response) => {
                    setRapper2(response.data.artists.items[0]);
                });
        });

        axios.get(API_URL + "/criteria").then((response) => {
            setCriteria(response.data);
        });

        setIsInfo(true);
        window.scrollTo(0, 0);
    }, [battleId, battle.rapper1_name, battle.rapper2_name]);

    if (resultsArePosted) {
        navigate("/");
    }

    return (
        <>
            {!(isInfo || isRapper1 || isRapper2 || isResults) && (
                <h1 className="battle__loading">loading</h1>
            )}
            {isInfo && (
                <main className="battle" ref={scrollToTopRef}>
                    <Link to="/" className="battle__heading">
                        WHO'S DA ILLEST?
                    </Link>
                    <h2 className="battle__name">{battle.name}</h2>
                    <div className="battle__rapper-info-container">
                        <RapperInfo rapper={rapper1} />
                        <RapperInfo rapper={rapper2} />
                    </div>
                    <button className="battle__button" onClick={startBattle}>
                        YO DJ! START THE BATTLE!
                    </button>
                </main>
            )}
            {isRapper1 && (
                <main className="battle" ref={scrollToTopRef}>
                    <Link to="/" className="battle__heading">
                        WHO'S DA ILLEST?
                    </Link>
                    <GradeRapper
                        rapper={rapper1}
                        criteria={criteria}
                        buttonText={"PASS THE MIC!"}
                        click1={passTheMic}
                        isRapper1={true}
                    />
                </main>
            )}
            {isRapper2 && (
                <main className="battle" ref={scrollToTopRef}>
                    <Link to="/" className="battle__heading">
                        WHO'S DA ILLEST?
                    </Link>
                    <GradeRapper
                        rapper={rapper2}
                        criteria={criteria}
                        buttonText={"DROP THE MIC!"}
                        click2={dropTheMic}
                        isRapper1={false}
                    />
                </main>
            )}
            {isResults && (
                <main className="battle" ref={scrollToTopRef}>
                    <Link to="/" className="battle__heading">
                        WHO'S DA ILLEST?
                    </Link>
                    <Results
                        rapper1={rapper1}
                        rapper2={rapper2}
                        rapper1Grade={rapper1Grade}
                        rapper2Grade={rapper2Grade}
                        battle={battle}
                        click3={backToBattles}
                    />
                </main>
            )}
        </>
    );
}
