import React, { useEffect, useState } from 'react';
import LatestDeaths from './LatestStats/LatestDeaths';
import LatestKills from './LatestStats/LatestKills';

const Player = () => {
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        const playerId = window.location.pathname.slice(7);
        fetch(`/players/${playerId}`, {
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

    const statistics = player && player.LifetimeStatistics;

    console.log(player);

    const totalFame =
        statistics &&
        statistics.Crafting.Total +
            statistics.FarmingFame +
            statistics.FishingFame +
            statistics.Gathering.All.Total +
            statistics.PvE.Total +
            player.KillFame;

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
            <h2>{player && player.Name}</h2>
            <ul>
                <li>Name: {player && player.Name}</li>
                <li>Guild: {player && player.GuildName}</li>
                <li>Total fame: {finalFame} </li>
                <li>
                    <LatestDeaths id={player && player.Id} />
                </li>
                <li>
                    <LatestKills id={player && player.Id} />
                </li>
            </ul>
        </div>
    );
};

export default Player;
