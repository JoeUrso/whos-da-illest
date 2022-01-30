import React from "react";
import "./RapperInfo.scss";

export default function RapperInfo({ rapper }) {
    return (
        <section className="rapper-info">
            <h3 className="rapper-info__name">{rapper.name}</h3>
            <article className="rapper-info__container">
                <img
                    className="rapper-info__image"
                    src={rapper.images[2].url}
                ></img>
                <div className="rapper-info__info-container">
                    <h4 className="rapper-info__info-headings">
                        Spotify Followers
                    </h4>
                    <p className="rapper-info__info">
                        {rapper.followers.total}
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
}
