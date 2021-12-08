import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getArtistDetails } from '../data.js'
import EpisodeResult from './EpisodeResult.js'
import DjResult from './DjResult.js'
import SongArtistResult from './SongArtistResult.js'


const ArtistDetailsLists = (props) => {
    const episodeList = [];
    const djList = [];
    const songArtistList = [];
    let artistName = '';

    Object.entries(props.artistDetails).forEach((entry) => {
        const [key, value] = entry;
        if (key === 'artist') {
            artistName = value.artist_name;
        }
        if (key === 'episodes') {
            value.forEach((element, index) => {
                episodeList[index] = <EpisodeResult key={index} value={element} />;
            })
        } else if (key === 'djs') {
            value.forEach((element, index) => {
                djList[index] = 
                    <div>
                        <DjResult key={index} value={element} />
                        <h6>Play Count: {element.episode_count}</h6>
                    </div>;
                })
        } else if (key === 'song_artists') {
            value.forEach((element, index) => {
                songArtistList[index] =                 
                <div>
                    <SongArtistResult artistName={artistName} key={index} value={element} />
                    <h6>Play Count: {element.play_count}</h6>
                </div>;
            })
        } else {
        console.log('Unrecognized data type')
    }
    })

    return (
        <div>
            <h3>Key Stats for {artistName}</h3>
            <ul>
                <li>
                    Top songs by this artist:
                    <ul className='song-artist-list'>{songArtistList}</ul>
                </li>
                <li>
                    DJs who play this artist:
                    <ul className='dj-list'>{djList}</ul>
                </li>
                <li> Episodes featuring this artist:
                    <ul className='episode-list'>{episodeList}</ul>
                </li>
            </ul> 
        </div>      
    ) 
}

export default function ArtistPage(props) {
    let params = useParams();
    let artistId = params.artistId;
    let [artistDetails, setArtistDetails] = useState({});
        
    useEffect(() => {
        let mounted = true;
            getArtistDetails(artistId, setArtistDetails, mounted);
            return () => {
                mounted = false;
                }
    }, [artistId])
            
    return (
        <div className="artist-info">
            <ArtistDetailsLists artistDetails={artistDetails}/>
        </div>
    )
}