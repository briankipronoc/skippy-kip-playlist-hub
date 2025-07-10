// server/app_server.js (formerly index.js)
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path'); // Required for lowdb file path
const { Low } = require('lowdb'); // Import Low from lowdb
const { JSONFile } = require('lowdb/node'); // Import JSONFile from lowdb/node

const app = express();
const PORT = process.env.PORT || 3001; // Use 3001 for the backend to avoid conflict with React (usually 3000 or 5173)

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

// Define the Spotify API base URL (this constant is still here for the other endpoint)
const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1'; // Should be correct now
const SPOTIFY_ACCOUNTS_URL = 'https://accounts.spotify.com/api/token'; // For getting access token

let spotifyAccessToken = null;
let tokenExpiryTime = 0;

// LowDB setup
const dbFilePath = path.join(__dirname, 'db.json');
const adapter = new JSONFile(dbFilePath);

// Define default data structure for LowDB
const defaultData = { votes: {}, battleSongs: {} };

// Initialize LowDB with adapter and default data
const db = new Low(adapter, defaultData);

// Initialize database with default structure if it doesn't exist (still good to keep this for robustness)
async function initializeDb() {
    await db.read();
    db.data = db.data || defaultData;
    await db.write();
    console.log('Database initialized successfully.');
}
initializeDb(); // Call immediately to ensure db is ready

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Function to get or refresh Spotify Access Token
async function getSpotifyAccessToken() {
    // If token exists and is not expired, return it
    if (spotifyAccessToken && Date.now() < tokenExpiryTime) {
        return spotifyAccessToken;
    }

    // Otherwise, request a new token
    try {
        const response = await axios.post(
            SPOTIFY_ACCOUNTS_URL, // Use the correct Spotify accounts URL
            'grant_type=client_credentials',
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
                }
            }
        );
        spotifyAccessToken = response.data.access_token;
        tokenExpiryTime = Date.now() + (response.data.expires_in - 60) * 1000; // Subtract 60 seconds for buffer
        console.log('New Spotify Access Token obtained.');
        return spotifyAccessToken;
    } catch (error) {
        console.error('Error getting Spotify access token:', error.response ? error.response.data : error.message);
        throw new Error('Failed to obtain Spotify access token.');
    }
}

// Endpoint to get featured playlists
app.get('/api/playlists/featured', async (req, res) => {
    try {
        const accessToken = await getSpotifyAccessToken();
        // ** THIS IS THE CRITICAL TEST: HARDCODING THE FULL URL HERE **
        const hardcodedFullUrl = 'https://accounts.spotify.com/api/token9'; // THIS SHOULD BE THE URL LOGGED
        const params = {
            country: 'KE', // Filter for Kenya
            locale: 'en_KE', // English (Kenya) locale
            limit: 20 // Number of playlists to fetch
        };

        const fullLogUrl = `${hardcodedFullUrl}?${new URLSearchParams(params).toString()}`;
        console.log(`Attempting to fetch featured playlists from (HARDCODED): ${fullLogUrl}`);

        const response = await axios.get(hardcodedFullUrl, { // Using the hardcoded URL directly
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            params: params
        });
        res.json(response.data.playlists.items);
    } catch (error) {
        console.error('Error fetching featured playlists:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch featured playlists.' });
    }
});

// Endpoint to get Kenyan Top Chart and prepare battle songs
app.get('/api/charts/kenyan-top', async (req, res) => {
    try {
        const accessToken = await getSpotifyAccessToken();
        // ID for "Top Songs - Kenya" playlist (as of recent check - this ID is stable for now)
        const kenyanTopPlaylistId = '37i9dQZEVXbJ8LPtGkEGGA';
        const requestUrl = `${SPOTIFY_API_BASE_URL}/playlists/${kenyanTopPlaylistId}/tracks`; // Still using constant here
        const params = {
            fields: 'items(track(id,name,artists(name),album(name,images,release_date),preview_url))',
            limit: 10
        };

        const fullLogUrl = `${requestUrl}?${new URLSearchParams(params).toString()}`;
        console.log(`Attempting to fetch Kenyan Top Chart from: ${fullLogUrl}`);

        const response = await axios.get(requestUrl, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            params: params
        });

        const topTracks = response.data.items.map(item => ({
            id: item.track.id,
            title: item.track.name,
            artist: item.track.artists.map(a => a.name).join(', '),
            albumArt: item.track.album.images.length > 0 ? item.track.album.images[0].url : null,
            previewUrl: item.track.preview_url,
            releaseDate: item.track.album.release_date
        }));

        // --- Battle Song Logic (integrate with LowDB votes) ---
        await db.read();

        if (topTracks.length >= 2) {
            const song1 = topTracks[0];
            const song2 = topTracks[1];

            db.data.battleSongs[song1.id] = song1;
            db.data.battleSongs[song2.id] = song2;

            db.data.votes[song1.id] = db.data.votes[song1.id] || 0;
            db.data.votes[song2.id] = db.data.votes[song2.id] || 0;

            await db.write();

            res.json({
                topTracks: topTracks,
                currentBattle: {
                    song1: { ...song1, votes: db.data.votes[song1.id] },
                    song2: { ...song2, votes: db.data.votes[song2.id] }
                }
            });

        } else {
            res.json({
                topTracks: topTracks,
                currentBattle: null
            });
        }

    } catch (error) {
        console.error('Error fetching Kenyan Top Chart:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch Kenyan Top Chart.' });
    }
});


// Endpoint to handle votes
app.post('/api/vote', async (req, res) => {
    const { songId } = req.body;

    if (!songId) {
        return res.status(400).json({ error: 'songId is required.' });
    }

    await db.read();

    db.data.votes[songId] = (db.data.votes[songId] || 0) + 1;

    await db.write();

    console.log(`Vote registered for song ID: ${songId}. New count: ${db.data.votes[songId]}`);
    res.status(200).json({ message: 'Vote registered successfully!', songId, newVoteCount: db.data.votes[songId] });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});