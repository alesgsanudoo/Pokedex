import React from 'react';
import axios from 'axios';
import './css/PokemonCard.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClose, faInfoCircle} from '@fortawesome/free-solid-svg-icons';

class Pokemon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageUrl: '',
            types: [],
            loading: true,
            stats: {},
            isPopupOpen: false,
        };
    }

    componentDidMount() {
        const {pokemonUrl} = this.props;

        axios
            .get(pokemonUrl)
            .then((response) => {
                const {data} = response;
                const name = data.name;
                const imageUrl =
                    data.sprites.front_default || 'https://via.placeholder.com/150';
                const types = data.types.map((type) => type.type.name);
                const stats = {};
                data.stats.forEach((stat) => {
                    stats[stat.stat.name] = stat.base_stat;
                });

                this.setState({name, imageUrl, types, stats, loading: false});
            })
            .catch((error) => {
                console.error(error);
            });
    }

    togglePopup = () => {
        this.setState({isPopupOpen: !this.state.isPopupOpen});
    };

    render() {
        const {name, loading, imageUrl, types, stats, isPopupOpen} = this.state;

        if (loading) {
            return null;
        }

        const mapTypeToClassName = (type) => `Pokemon-type-${type}`;

        const renderType = (type) => (
            <div key={type} className={mapTypeToClassName(type)}>
                {type}
            </div>
        );

        return (
            <div className="Pokemon-card">
                <div className="Pokemon-header">
                    <h2>
                        {name}
                        <span className="Pokemon-info-icon" onClick={this.togglePopup}> <FontAwesomeIcon
                            icon={faInfoCircle}/>
            </span>
                    </h2>
                    {isPopupOpen && (
                        <div className="Pokemon-popup">
                            <h3>{name} Stats <span className="Pokemon-info-icon"
                                                   onClick={this.togglePopup}> <FontAwesomeIcon icon={faClose}/></span>
                            </h3>
                            {Object.entries(stats).map(([key, value]) => (
                                <li key={key}>
                                    {key}:
                                    <div className="Pokemon-status-bar">
                                        <div
                                            className={`Pokemon-status-bar-fill Pokemon-status-bar-fill-${key}`}
                                            style={{width: `${value}%`}}
                                        />
                                    </div>
                                </li>
                            ))}
                        </div>
                    )}
                </div>
                <img src={imageUrl} alt={name} className="Pokemon-image"/>
                <div className="Pokemon-type">
                    {types.map((type) => renderType(type))}
                </div>
            </div>
        );
    }
}

export default Pokemon;
