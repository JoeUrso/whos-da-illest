import { SignInButton, SignOutButton, useUser } from "@clerk/clerk-react";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../..";
import classicScratch from "../../assets/sounds/ClassicScratch.mp3";
import { useBattleContext } from "../../context/GameContext";
import {
    addUserToDatabase,
    fetchBattles,
    fetchRapperGrades,
    fetchRappers,
} from "../../utils/api";
import "./Homepage.scss";

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

const RapperStats = ({ rapper, avgGrade }) => {
    return (
        <article className="rapper-stats">
            <p className="rapper-stats__name">{rapper.name}</p>
            <p className="rapper-stats__w-l">
                {rapper.wins}-{rapper.losses}
            </p>
            <p className="rapper-stats__avg-grade">{avgGrade}</p>
        </article>
    );
};

const RapperTable = ({ isLoading, rappers }) => {
    if (isLoading) {
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
                    {Array.from({ length: 20 }).map((_, index) => (
                        <div
                            key={index}
                            style={{ height: "20px", margin: "10px 0" }}
                        ></div>
                    ))}
                </div>
            </section>
        );
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
                            avgGrade={Math.round(rapper.grade)}
                        />
                    ))}
            </div>
        </section>
    );
};

const BattleInfo = ({ battle, user }) => {
    const { setRapper1, setRapper2, setBattle } = useBattleContext();

    const handleChooseBattle = () => {
        setBattle(battle);
        setRapper1(battle.rapper1_name);
        setRapper2(battle.rapper2_name);
    };

    const BattleLink = user ? Link : "div";

    return (
        <BattleLink
            className={`battle-info ${user ? "" : "disabled"}`}
            key={battle.id}
            to={user ? "/battle/" + battle.id + "/start" : ""}
            onClick={user ? handleChooseBattle : null}
        >
            <article className="battle-info__container">
                <div className="battle-info__name-container">
                    <h3 className="battle-info__card-headings">BATTLE NAME</h3>
                    <p className="battle-info__name">{battle.name}</p>
                </div>
                <div className="battle-info__rappers-battles-fought-container">
                    <div className="battle-info__rappers-container">
                        <h3 className="battle-info__card-headings">RAPPERS</h3>
                        <p className="battle-info__rappers">
                            {battle.rapper1_name} vs {battle.rapper2_name}
                        </p>
                    </div>
                    <div className="battle-info__battles-fought-container">
                        <h3 className="battle-info__card-headings">
                            BATTLES FOUGHT
                        </h3>
                        <p className="battle-info__total-battles">
                            {battle.total_battles}
                        </p>
                    </div>
                </div>
            </article>
        </BattleLink>
    );
};

const BattleTable = ({ battles, scrollToDiv }) => {
    const { user } = useUser();

    return (
        <section className="homepage__battles" ref={scrollToDiv}>
            <h2 className="homepage__subheading">Battle Board</h2>
            <p className="homepage__click-to-play">
                {user ? "click a battle to play" : "sign in to play"}
            </p>
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
                        <BattleInfo
                            key={battle.id}
                            battle={battle}
                            user={user}
                        />
                    ))}
            </div>
        </section>
    );
};

const HomePage = () => {
    const [rappers, setRappers] = useState([]);
    const [battles, setBattles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const classicScratchAudio = new Audio(classicScratch);

    const scrollToDiv = useRef();
    const scrollHandler = () => {
        scrollToDiv.current.scrollIntoView({ behavior: "smooth" });
        classicScratchAudio.play();
    };

    const { user } = useUser();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const rappersData = await fetchRappers();
                const rappersWithGrades = await fetchRapperGrades(
                    rappersData.data
                );
                const battlesWithRapperNames = await fetchBattles(
                    rappersData.data
                );

                setRappers(rappersWithGrades.data);
                setBattles(battlesWithRapperNames.data);
                setIsLoading(false);
            } catch (error) {
                //TODO set error state? setError(error.message);
                alert(error.message);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (user) {
            const { id, firstName, lastName, primaryEmailAddress } = user;
            const newUser = {
                id: id,
                first_name: firstName,
                last_name: lastName,
                email_address: primaryEmailAddress.emailAddress,
            };

            addUserToDatabase(newUser);
        }
    }, [user]);

    return (
        <main className="homepage">
            <HomePageHeading />
            {user ? (
                <>
                    <GoToBattlesButton
                        onButtonClick={() => {
                            scrollHandler();
                            classicScratchAudio.play();
                        }}
                    />
                    <SignOutButton />
                </>
            ) : (
                <SignInButton mode="modal">
                    <button className="homepage__button">Sign In</button>
                </SignInButton>
            )}
            <RapperTable isLoading={isLoading} rappers={rappers} />
            <BattleTable battles={battles} scrollToDiv={scrollToDiv} />
        </main>
    );
};

export default HomePage;
