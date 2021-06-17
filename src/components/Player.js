import React, { useEffect, useState } from 'react';
import LatestDeaths from './LatestStats/LatestDeaths';
import LatestKills from './LatestStats/LatestKills';

const Player = () => {
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        const playerId = window.location.pathname.slice(8);

        const albionApi = `https://gameinfo.albiononline.com/api/gameinfo/players/${playerId}`;
        const url = `https://api.allorigins.win/get?url=${encodeURIComponent(albionApi)}`;

        fetch(url, {
            'Content-Type': 'application/json',
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                setPlayer(data);
            })
            .catch((error) => console.log('Error fetching data: ', error));
    }, []);

    const playerResult = player && JSON.parse(player.contents);

    const statistics = playerResult && playerResult.LifetimeStatistics;

    const totalFame =
        statistics &&
        statistics.Crafting.Total +
            statistics.FarmingFame +
            statistics.FishingFame +
            statistics.Gathering.All.Total +
            statistics.PvE.Total +
            playerResult.KillFame;

    const finalFame =
        Math.abs(totalFame && totalFame) > 999999
            ? Math.sign(totalFame && totalFame) *
                  (Math.abs(totalFame && totalFame) / 1000000).toFixed(2) +
              'm'
            : Math.round(
                  Math.sign(totalFame && totalFame) * Math.abs(totalFame && totalFame)
              );

    return (
        <div>
            <h2>{playerResult && playerResult.Name}</h2>
            <ul>
                <li>Name: {playerResult && playerResult.Name}</li>
                <li>Guild: {playerResult && playerResult.GuildName}</li>
                <li>Total fame: {finalFame} </li>
                <li>
                    <LatestDeaths id={playerResult && playerResult.Id} />
                </li>
                <li>
                    <LatestKills id={playerResult && playerResult.Id} />
                </li>
            </ul>
        </div>
    );
};

export default Player;
