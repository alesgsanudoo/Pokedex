import React from 'react';
import PokemonList from './PokemonList';
import './css/App.css';
import Header from "./Header";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <PokemonList/>
            </div>
        );
    }
}

export default App;
