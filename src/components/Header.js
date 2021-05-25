import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div id="header">
            <Link to="/">
                <h1>Albion data</h1>
            </Link>
        </div>
    );
};

export default Header;
