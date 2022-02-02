import React, { Component } from "react";
import "./GradeRapper.scss";

export default class GradeRapper extends Component {
    state = {
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
        rapperGrade: null,
        isRapperSaved: false,
        isExplainerShown: false,
    };

    displayPoints = (event) => {
        let name = event.target.name.toLowerCase();
        let points = event.target.value;

        this.setState({
            [name]: points,
        });
    };

    storeGradeAndReset1 = () => {
        const {
            presence,
            flow,
            rhymes,
            complexity,
            articulation,
            creativity,
            versatility,
            depth,
            hits,
            performance,
        } = this.state;

        let pointsArr = [
            presence,
            flow,
            rhymes,
            complexity,
            articulation,
            creativity,
            versatility,
            depth,
            hits,
            performance,
        ];

        let parsedPoints = pointsArr.map((point) => {
            return parseInt(point);
        });

        let pointsSum = parsedPoints.reduce((a, b) => a + b, 0);
        let grade = pointsSum / 10;

        this.setState({
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
            rapperGrade: grade,
            isRapperSaved: true,
        });
    };

    render() {
        const { rapper, criteria, click1, click2, buttonText, isRapper1 } =
            this.props;

        return (
            <section className="grade">
                <h2 className="grade__rapper-name">{rapper.name}</h2>
                <article className="grade__container">
                    {criteria.map((criterion) => {
                        let key = criterion.criterion.toLowerCase();
                        return (
                            <div
                                className="grade__card-container"
                                key={criterion.id}
                            >
                                <div className="tooltip">
                                    {criterion.criterion}
                                    <span className="tooltip-text">
                                        {criterion.explainer}
                                    </span>
                                </div>
                                <div className="grade__slider-container">
                                    <input
                                        type="range"
                                        name={criterion.criterion}
                                        min={0}
                                        max={100}
                                        defaultValue={0}
                                        className="grade__slider"
                                        onChange={this.displayPoints}
                                    ></input>
                                </div>
                                <p className="grade__value">
                                    {this.state[key]}
                                </p>
                            </div>
                        );
                    })}
                </article>

                {isRapper1 === true && (
                    <>
                        {this.state.isRapperSaved === false && (
                            <button
                                className="grade__button"
                                onClick={this.storeGradeAndReset1}
                            >
                                SAVE YA GRADE!
                            </button>
                        )}

                        {this.state.isRapperSaved === true && (
                            <button
                                className="grade__button"
                                onClick={() => {
                                    click1(this.state.rapperGrade);
                                    this.setState({
                                        isRapper1Done: true,
                                    });
                                }}
                            >
                                {buttonText}
                            </button>
                        )}
                    </>
                )}

                {isRapper1 === false && (
                    <>
                        {this.state.isRapperSaved === false && (
                            <button
                                className="grade__button"
                                onClick={this.storeGradeAndReset1}
                            >
                                SAVE YA GRADE!
                            </button>
                        )}

                        {this.state.isRapperSaved === true && (
                            <button
                                className="grade__button"
                                onClick={() => {
                                    click2(this.state.rapperGrade);
                                }}
                            >
                                {buttonText}
                            </button>
                        )}
                    </>
                )}
            </section>
        );
    }
}
