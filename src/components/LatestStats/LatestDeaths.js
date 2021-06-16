import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const LatestDeaths = ({ id }) => {
    const [deaths, setDeaths] = useState(null);

    useEffect(() => {
        fetch(`https://gameinfo.albiononline.com/api/gameinfo/players/${id}/deaths`, {
            'Content-Type': 'application/json',
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                setDeaths(data);
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

    // console.log(deaths);

    return (
        <div>
            <h3>Latest deaths:</h3>
            <hr />
            {deaths &&
                deaths.map((d) => (
                    <Link
                        to={`/event/${d.EventId}`}
                        key={d.BattleId}
                        className="deathCard"
                    >
                        <ul>
                            <li>Killer: {d.Killer.Name}</li>
                            <li>Guild: {d.Killer.GuildName}</li>
                            <li>IP: {ip(d.Killer.AverageItemPower)}</li>
                        </ul>
                    </Link>
                ))}
        </div>
    );
};

export default LatestDeaths;
