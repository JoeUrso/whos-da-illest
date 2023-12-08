import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../..";
import classicScratch from "../../assets/sounds/ClassicScratch.mp3";
import BattleInfo from "../../components/BattleInfo/BattleInfo";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import RapperStats from "../../components/RapperStats/RapperStats";
import "./Homepage.scss";

const API_URL = process.env.API_URL || "http://localhost:8080";

const HomePageHeading = () => (
    <Link to="/" className="homepage__heading">
        WHO'S DA ILLEST?
    </Link>
);

const GoToBattlesButton = ({ onButtonClick }) => (
    <button className="homepage__button" onClick={onButtonClick}>
        Go To Battles
    </button>
);

const RapperTable = ({ isLoading, rappers }) => {
    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <section className="homepage__rappers">
            <h2 className="homepage__subheading">On Da Mic</h2>
            <div className="homepage__rappers-table">
                <div className="homepage__rappers-table-headings">
                    <h3 className="homepage__rappers-table-name">NAME</h3>
                    <h3 className="homepage__rappers-table-w-l">W-L</h3>
                    <h3 className="homepage__rappers-table-avg-grade">
                        AVG GRADE
                    </h3>
                </div>
                {rappers
                    .sort((a, b) => b.grade - a.grade)
                    .slice(0, 20)
                    .map((rapper) => (
                        <RapperStats
                            key={rapper.id}
                            rapper={rapper}
                            avgGrade={rapper.grade}
                        />
                    ))}
            </div>
        </section>
    );
};

const BattleTable = ({ battles, scrollToDiv }) => (
    <section className="homepage__battles" ref={scrollToDiv}>
        <h2 className="homepage__subheading">Battle Board</h2>
        <p className="homepage__click-to-play">click a battle to play</p>
        <div className="homepage__battles-table homepage__battles-table--mobile">
            <div className="homepage__battles-table-headings">
                <h3 className="homepage__battles-table-name">NAME</h3>
                <h3 className="homepage__battles-table-rappers">RAPPERS</h3>
                <h3 className="homepage__battles-table-battles-fought">
                    FOUGHT
                </h3>
            </div>
            {battles
                .sort((a, b) => b.total_battles - a.total_battles)
                .slice(0, 10)
                .map((battle) => (
                    <BattleInfo key={battle.id} battle={battle} />
                ))}
        </div>
    </section>
);

const HomePage = () => {
    const [rappers, setRappers] = useState([]);
    const [battles, setBattles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // SOUND FX
    const classicScratchAudio = new Audio(classicScratch);

    // SCROLL TO BATTLE BOARD
    const scrollToDiv = useRef();
    const scrollHandler = () => {
        scrollToDiv.current.scrollIntoView({ behavior: "smooth" });
        classicScratchAudio.play();
    };

    useEffect(() => {
        const fetchRappersAndGrades = async () => {
            try {
                const responseRappers = await axios.get(API_URL + "/rappers");
                const rappersData = responseRappers.data;

                const responseGrades = await axios.get(
                    API_URL + "/grades/avg-grades"
                );
                const gradesData = responseGrades.data;

                const rappersWithGrades = rappersData.map((rapper) => {
                    const foundGrade = gradesData.find(
                        (grade) => grade.rapper_id === rapper.id
                    );
                    return {
                        ...rapper,
                        grade: foundGrade ? foundGrade.avgGrade : null,
                    };
                });

                setRappers(rappersWithGrades);
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to fetch rappers and grades:", error);
            }
        };

        const fetchBattles = async () => {
            try {
                const response = await axios.get(API_URL + "/battles");
                setBattles(response.data);
            } catch (error) {
                console.error("Failed to fetch battles:", error);
            }
        };

        fetchRappersAndGrades();
        fetchBattles();
    }, []);

    return (
        <main className="homepage">
            <HomePageHeading />
            <GoToBattlesButton
                onButtonClick={() => {
                    scrollHandler();
                    classicScratchAudio.play();
                }}
            />
            <RapperTable isLoading={isLoading} rappers={rappers} />
            <BattleTable battles={battles} scrollToDiv={scrollToDiv} />
        </main>
    );
};

export default HomePage;
