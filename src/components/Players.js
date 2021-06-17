import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Player = () => {
    const [players, setPlayers] = useState(null);
    const [search, setSearch] = useState('');

    const handleSubmit = (s) => {
        s.preventDefault();

        const albionApi = `https://gameinfo.albiononline.com/api/gameinfo/search?q=${search}`;
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
                setPlayers(data.contents);
            })
            .catch((error) => console.log('Error fetching data: ', error));
    };

    const playersResult = players && JSON.parse(players).players;

    return (
        <div>
            <h2>Search player</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={search}
                    onChange={(s) => setSearch(s.target.value)}
                />
                <button>Go</button>
            </form>
            <div>
                {playersResult &&
                    playersResult.map((p) => (
                        <Link to={`/player/${p.Id}`} key={p.Id} className="playerCard">
                            <p>{p.Name}</p>
                        </Link>
                    ))}
            </div>
        </div>
    );
};

export default Player;
