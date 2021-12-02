import React from 'react';
import './index.css';
import Searchbar from './routes/Searchbar'
import ResultsList from './routes/ResultsList'
import Filter from './Filter'
import LoginControl from './LoginControl.js'
import axios from "axios";
import { Outlet } from "react-router-dom";
import { globalSearch } from './data';

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

        globalSearch(searchValue);
    }



    render() {

        const searchValue = this.state.searchValue;
        const searchResults = this.state.searchResults;

        return (
            <div className="container">
                <Searchbar searchValue={searchValue} onSearchValueChange={this.handleSearchValueChange} onSearchValueSubmit={this.handleSearchValueSubmit} />
                <div>
                    <ResultsList searchResults={searchResults} searchValue={searchValue} />
                </div>
            </div>
        )
    }
}
export default App