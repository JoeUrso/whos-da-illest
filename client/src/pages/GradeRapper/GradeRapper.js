import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import scratch1 from "../../assets/sounds/Scratch1.mp3";
import scratch2 from "../../assets/sounds/Scratch2.mp3";
import { useBattleContext } from "../../context/GameContext";
import { getCriteria } from "../../utils/api";
import "./GradeRapper.scss";

const Criteria = ({ criterion, grades, displayPoints }) => (
    <div className="grade__card-container" key={criterion.id}>
        <div className="tooltip">
            {criterion.criterion}
            <span className="tooltip-text">{criterion.explainer}</span>
        </div>
        <div className="grade__slider-container">
            <input
                type="range"
                name={criterion.criterion}
                min={0}
                max={100}
                value={grades[criterion.criterion.toLowerCase()] || 0}
                className="grade__slider"
                onChange={displayPoints}
            />
        </div>
        <p className="grade__value">
            {grades[criterion.criterion.toLowerCase()]}
        </p>
    </div>
);

const GradeRapper = ({ rapper }) => {
    const [grades, setGrades] = useState({
        presence: 0,
        flow: 0,
        rhymes: 0,
        complexity: 0,
        articulation: 0,
        creativity: 0,
        versatility: 0,
        depth: 0,
        hits: 0,
        performance: 0,
    });
    const [criteria, setCriteria] = useState([]);

    const { setRapper1Grade, setRapper2Grade, rapper1, rapper2, battle } =
        useBattleContext();
    const navigate = useNavigate();

    const scratch1Audio = new Audio(scratch1);
    const scratch2Audio = new Audio(scratch2);

    useEffect(() => {
        const fetchCriteria = async () => {
            try {
                const response = await getCriteria();
                setCriteria(response.data);
            } catch (error) {
                throw new Error("Failed to fetch criteria:", error);
            }
        };

        fetchCriteria();
    }, []);

    const displayPoints = (event) => {
        setGrades({
            ...grades,
            [event.target.name.toLowerCase()]: event.target.value,
        });
    };

    const storeGradeAndReset = () => {
        const totalPoints = Object.values(grades).reduce(
            (a, b) => a + parseInt(b),
            0
        );
        const grade = totalPoints / 10;

        setGrades({
            presence: 0,
            flow: 0,
            rhymes: 0,
            complexity: 0,
            articulation: 0,
            creativity: 0,
            versatility: 0,
            depth: 0,
            hits: 0,
            performance: 0,
        });

        if (rapper === rapper1) {
            scratch1Audio.play();
            setRapper1Grade(Math.round(grade));
            navigate(`/battle/${battle.id}/rapper2`);
        } else if (rapper === rapper2) {
            scratch2Audio.play();
            setRapper2Grade(Math.round(grade));
            navigate(`/battle/${battle.id}/results`);
        }

        window.scrollTo(0, 0);
    };

    return (
        <main className="battle">
            <Link to="/" className="battle__heading">
                WHO'S DA ILLEST?
            </Link>
            <section className="grade">
                <h2 className="grade__rapper-name">{rapper.name}</h2>
                <article className="grade__container">
                    {criteria.map((criterion) => (
                        <Criteria
                            key={criterion.id}
                            criterion={criterion}
                            grades={grades}
                            displayPoints={displayPoints}
                        />
                    ))}
                </article>
                <button className="grade__button" onClick={storeGradeAndReset}>
                    Drop the Mic!
                </button>
            </section>
        </main>
    );
};

export default GradeRapper;
