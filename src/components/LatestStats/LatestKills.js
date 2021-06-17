import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const LatestKills = ({ id }) => {
    const [kills, setKills] = useState(null);

    useEffect(() => {
        fetch(`/players/${id}/kills`, {
            'Content-Type': 'application/json',
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                setKills(data);
            })
            .catch((error) => console.log('Error fetching data: ', error));
        // eslint-disable-next-line
    }, [id]);

    function ip(power) {
        const ip =
            Math.abs(power) > 999
                ? Math.sign(power) * (Math.abs(power) / 1000).toFixed(2) + 'k'
                : Math.round(Math.sign(power) * Math.abs(power));
        return ip;
    }

    // console.log(kills);

    return (
        <div>
            <h3>Latest kills:</h3>
            <hr />
            {kills &&
                kills.map((k) => (
                    <Link
                        to={`/event/${k.EventId}`}
                        key={k.BattleId}
                        className="deathCard"
                    >
                        <ul>
                            <li>Victim: {k.Victim.Name}</li>
                            <li>Guild: {k.Victim.GuildName}</li>
                            <li>IP: {ip(k.Victim.AverageItemPower)}</li>
                        </ul>
                    </Link>
                ))}
        </div>
    );
};

export default LatestKills;
