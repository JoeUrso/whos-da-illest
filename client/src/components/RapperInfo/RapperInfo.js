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
                        src={rapper.images[2].url}
                    ></img>
                </div>
                <div className="rapper-info__info-container">
                    <h4 className="rapper-info__info-headings">
                        Spotify Followers
                    </h4>
                    <p>{rapper.followers.total}</p>
                    <h4 className="rapper-info__info-headings">
                        Spotify Popularity Rating
                    </h4>
                    <p>{rapper.popularity}</p>
                    <h4 className="rapper-info__info-headings">SubGenres</h4>
                    <p>{rapper.genres[0]}</p>
                </div>
            </article>
        </section>
    );
}
