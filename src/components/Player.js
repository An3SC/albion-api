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

    // console.log(player);

    return (
        <div>
            <ul>
                <li>Name: {player && player.Name}</li>
                <li>Guild: {player && player.GuildName}</li>
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
