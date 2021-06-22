import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Player = () => {
    const [players, setPlayers] = useState(null);
    const [search, setSearch] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [searching, setSearching] = useState(false);

    const handleSubmit = (s) => {
        s.preventDefault();

        setSearching(true);
        setLoaded(false);

        const albionApi = `https://gameinfo.albiononline.com/api/gameinfo/search?q=${search}`;
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
                setPlayers(data.contents);
            })
            .catch((error) => console.log('Error fetching data: ', error));
    };

    const playersResult = players && JSON.parse(players).players;

    return (
        <div id="searchPlayer">
            <h2>Search player</h2>
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="text"
                    value={search}
                    onChange={(s) => setSearch(s.target.value)}
                />
                <button>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-search"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#dcdcdc"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <circle cx="10" cy="10" r="7" />
                        <line x1="21" y1="21" x2="15" y2="15" />
                    </svg>
                </button>
            </form>
            {loaded && (
                <div>
                    {playersResult &&
                        playersResult.map((p) => (
                            <Link
                                to={`/player/${p.Id}`}
                                key={p.Id}
                                className="playerCard"
                            >
                                <p>{p.Name}</p>
                            </Link>
                        ))}
                </div>
            )}
            {searching && !loaded && (
                <div className="sk-chase">
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                </div>
            )}
        </div>
    );
};

export default Player;
