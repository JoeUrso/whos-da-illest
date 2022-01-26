import axios from "axios";
import React, { Component } from "react";
const client_id = "b5e35c2df7ec4fcd86e84ed4cb6deb0b";
const client_secret = "f1d652247399449eb62b59c1db08d70d";
const BASE_64_ENCODED_AUTH = buffer.from(client_id + ":" + client_secret);

console.log(BASE_64_ENCODED_AUTH);

const getToken = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "",
    },
    grant_type: "client_credentials",
};

export default class BattlePage extends Component {
    state = {
        rapper1: [],
        rapper2: [],
        token: "",
    };

    requestAuthorization = () => {
        axios.post(getToken).then((response) => {
            console.log(response.data);
        });
    };

    componentDidMount = () => {
        this.requestAuthorization();
    };

    render() {
        return <div></div>;
    }
}
