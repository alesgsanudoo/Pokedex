import React from 'react';
import Pokemon from './Pokemon';
import axios from 'axios';
import Footer from './Footer';

class PokemonList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pokemonUrls: [],
            loading: true,
            currentPage: 1,
            totalPages: null,
        };
    }

    componentDidMount() {
        this.fetchPokemonData();
    }

    fetchPokemonData() {
        const {currentPage} = this.state;
        const offset = (currentPage - 1) * 20;

        axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
            .then(response => {
                const {data} = response;
                const pokemonUrls = data.results.map(pokemon => pokemon.url);
                const totalPages = Math.ceil(data.count / 20);

                this.setState({pokemonUrls, totalPages, loading: false});
            })
            .catch(error => {
                console.error(error);
            });
    }

    handlePrevPage = () => {
        const {currentPage} = this.state;
        if (currentPage > 1) {
            this.setState({currentPage: currentPage - 1, loading: true}, () => {
                this.fetchPokemonData();
            });
        }
    };

    handleNextPage = () => {
        const {currentPage, totalPages} = this.state;
        if (currentPage < totalPages) {
            this.setState({currentPage: currentPage + 1, loading: true}, () => {
                this.fetchPokemonData();
            });
        }
    };

    render() {
        const {pokemonUrls, loading, currentPage, totalPages} = this.state;
        if (loading) {
            return null;
        }

        return (
            <div className="poke-list">
                <div className="pagination">
                    <div className="pagination">
                        <button className={currentPage === 1 ? 'prev-btn' : 'prev-btn'}
                                onClick={this.handlePrevPage} disabled={currentPage === 1}>Prev
                        </button>
                        <span>Page {currentPage} of {totalPages}  </span>
                        <button className="next-btn" onClick={this.handleNextPage}
                                disabled={currentPage === totalPages}>Next
                        </button>
                    </div>
                </div>
                <div className="pokemon-list">
                    {pokemonUrls.map(pokemonUrl => (
                        <Pokemon key={pokemonUrl} pokemonUrl={pokemonUrl}/>
                    ))}
                </div>
                <Footer/>
            </div>
        );
    }
}

export default PokemonList;
