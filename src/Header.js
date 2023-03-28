import React from 'react';
import './css/Header.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEnvelope} from '@fortawesome/free-solid-svg-icons'


function Header() {
    return (
        <div className="header">
            <h1 className="pokemon-text">Poke<span className="dex-text">dex</span></h1>
            <nav>
                <ul>
                    <li><a href="mailto:contact@alesgsanudoo.com"><FontAwesomeIcon icon={faEnvelope}/> Contact</a></li>
                </ul>
            </nav>
        </div>

    );
}

export default Header;
