import React from "react";
import "./RapperInfo.scss";

export default function RapperInfo({ rapper }) {
    return (
        <section className="rapper-info">
            <h3 className="rapper-info__name">{rapper.name}</h3>
            <article className="rapper-info__container">
                <div className="rapper-info__albums">
                    <img
                        className="rapper-info__album"
                        src="https://via.placeholder.com/80"
                    ></img>
                    <img
                        className="rapper-info__album"
                        src="https://via.placeholder.com/80"
                    ></img>
                    <img
                        className="rapper-info__album"
                        src="https://via.placeholder.com/80"
                    ></img>
                </div>
                <div className="rapper-info__info-container">
                    <h4 className="rapper-info__info-headings">
                        Spotify Followers
                    </h4>
                    <h4 className="rapper-info__info-headings">
                        Popularity Rating
                    </h4>
                    <h4 className="rapper-info__info-headings">Top Songs</h4>
                    <h4 className="rapper-info__info-headings">Albums</h4>
                </div>
            </article>
        </section>
    );
}
