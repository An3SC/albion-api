import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Player = () => {
    const [players, setPlayers] = useState(null);
    const [search, setSearch] = useState('');

    const handleSubmit = (s) => {
        s.preventDefault();
        fetch(`/search?q=${search}`, {
            'Content-Type': 'application/json',
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                setPlayers(data.players);
                console.log(data);
            })
            .catch((error) => console.log('Error fetching data: ', error));
    };

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
                {players &&
                    players.map((p) => (
                        <Link to={`/player/${p.Id}`} key={p.Id} className="playerCard">
                            <p>{p.Name}</p>
                        </Link>
                    ))}
            </div>
        </div>
    );
};

export default Player;
