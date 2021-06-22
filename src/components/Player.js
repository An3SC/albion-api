import React, { useEffect, useState } from 'react';
import LatestDeaths from './LatestStats/LatestDeaths';
import LatestKills from './LatestStats/LatestKills';

const Player = () => {
    const [player, setPlayer] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const playerId = window.location.pathname.slice(8);

        const albionApi = `https://gameinfo.albiononline.com/api/gameinfo/players/${playerId}`;
        const url = `https://api.allorigins.win/get?url=${encodeURIComponent(albionApi)}`;

        fetch(url, {
            'Content-Type': 'application/json',
        })
            .then((response) => {
                if (response.ok) {
                    setLoaded(true);
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
        <div id="playerData">
            {!loaded && (
                <div className="spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div>
            )}
            <h2>{playerResult && playerResult.Name}</h2>
            <ul>
                <li className="playerData">
                    Name: <b>{playerResult && playerResult.Name}</b>
                </li>
                <li className="playerData">
                    Guild: <b>{playerResult && playerResult.GuildName}</b>
                </li>
                <li className="playerData playerMB">
                    Total fame: <b>{finalFame}</b>{' '}
                </li>
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
