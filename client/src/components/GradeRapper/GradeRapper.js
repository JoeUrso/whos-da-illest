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
        isSaved: false,
    };

    displayPoints = (event) => {
        let name = event.target.name.toLowerCase();
        let points = event.target.value;

        this.setState({
            [name]: points,
        });
    };

    storeGradeAndReset = () => {
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
            isSaved: true,
        });
    };

    render() {
        const { rapper, criteria, click, buttonText } = this.props;

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
                                <h3 className="grade__criterion">
                                    {criterion.criterion}
                                </h3>
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
                {this.state.isSaved === false ? (
                    <button
                        className="grade__button"
                        onClick={this.storeGradeAndReset}
                    >
                        DROP YA MIC!
                    </button>
                ) : (
                    <button
                        className="grade__button"
                        onClick={click(this.state.rapperGrade)}
                    >
                        {buttonText}
                    </button>
                )}

                {/* {this.state.isSaved === false && (
                    <button
                        className="grade__button"
                        onClick={this.storeGradeAndReset}
                    >
                        SAVE YOUR GRADE!
                    </button>
                )}

                {this.state.isSaved === true && (
                    <button
                        className="grade__button"
                        onClick={click(this.state.rapperGrade)}
                    >
                        {buttonText}
                    </button>
                )} */}
            </section>
        );
    }
}
