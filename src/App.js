import React from 'react';
import './index.css';
import Searchbar from './Searchbar'
import ResultsList from './ResultsList'
import Filter from './Filter'
import LoginControl from './LoginControl.js'
import axios from "axios";
const dotenv = require('dotenv');
dotenv.config();

// TODO: figure out how to use React Native Safe Area Context

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            searchResults: [],
            loading: true
        };
        this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
        this.handleSearchValueSubmit = this.handleSearchValueSubmit.bind(this);
    }

    handleSearchValueChange(value) {
        this.setState({ searchValue: value })
    }

    handleSearchValueSubmit(event) {
        const searchValue = this.state.searchValue;

        event.preventDefault();
        axios.get(`https://crater-backend.herokuapp.com/api/search/${searchValue}`)
            .then((res) => {
                this.setState({ searchResults: res.data });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }



    render() {

        const searchValue = this.state.searchValue;
        const searchResults = this.state.searchResults;

        return (
            <div className="container">
                <div className="page-header">
                    <h1>Crater</h1>
                    <LoginControl />
                    <p>Your portal to music discovery.</p>
                    <Searchbar searchValue={searchValue} onSearchValueChange={this.handleSearchValueChange} onSearchValueSubmit={this.handleSearchValueSubmit} />
                </div>
                <div>
                    <Filter />
                    <ResultsList searchResults={searchResults} searchValue={searchValue} />
                </div>
            </div>
        )
    }
}
export default App