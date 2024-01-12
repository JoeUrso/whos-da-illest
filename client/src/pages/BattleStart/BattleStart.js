import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import watchThis from "../../assets/sounds/WatchThis.mp3";
import { useBattleContext } from "../../context/GameContext";
import { getRapperData } from "../../utils/api";
import "./BattleStart.scss";

const RapperInfo = ({ rapper }) => {
    return (
        <section className="rapper-info">
            <h3 className="rapper-info__name">{rapper.name}</h3>
            <article className="rapper-info__container">
                <img
                    className="rapper-info__image"
                    src={rapper.images[2].url}
                    alt=""
                ></img>
                <div className="rapper-info__info-container">
                    <h4 className="rapper-info__info-headings">
                        Spotify Followers
                    </h4>
                    <p className="rapper-info__info">
                        {rapper.followers.total.toLocaleString("en-US")}
                    </p>
                    <h4 className="rapper-info__info-headings">
                        Spotify Popularity Rating
                    </h4>
                    <p className="rapper-info__info">{rapper.popularity}</p>
                    <h4 className="rapper-info__info-headings">SubGenre</h4>
                    <p className="rapper-info__info rapper-info__info--genre">
                        {rapper.genres[0]}
                    </p>
                </div>
            </article>
        </section>
    );
};

const BattleStart = () => {
    const { battle, rapper1, rapper2, setRapper1, setRapper2 } =
        useBattleContext();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const watchThisAudio = new Audio(watchThis);

    useEffect(() => {
        const fetchRapperData = async () => {
            const rapper1Data = await getRapperData(battle.rapper1_name);
            const rapper2Data = await getRapperData(battle.rapper2_name);
            setRapper1(rapper1Data);
            setRapper2(rapper2Data);
            setLoading(false);
        };

        fetchRapperData();
    }, []);

    const startBattle = () => {
        watchThisAudio.play();

        navigate(`/battle/${battle.id}/rapper1`);
    };

    if (loading) return <div>loading</div>;

    return (
        <main className="battle">
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
    );
};

export default BattleStart;
