// src/App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PlaylistCard from './components/PlaylistCard';
import SongBattleCard from './components/SongBattleCard';
import KenyanTopChart from './components/KenyanTopChart'; // New component

function App() {
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const [kenyanTopChart, setKenyanTopChart] = useState([]);
  const [currentBattle, setCurrentBattle] = useState(null); // Initially null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BACKEND_URL = 'http://localhost:3001'; // Your backend server URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch Featured Playlists
        const playlistsResponse = await fetch(`${BACKEND_URL}/api/playlists/featured`);
        if (!playlistsResponse.ok) {
          throw new Error(`HTTP error! status: ${playlistsResponse.status}`);
        }
        const playlistsData = await playlistsResponse.json();
        setFeaturedPlaylists(playlistsData);

        // Fetch Kenyan Top Chart
        const chartResponse = await fetch(`${BACKEND_URL}/api/charts/kenyan-top`);
        if (!chartResponse.ok) {
          throw new Error(`HTTP error! status: ${chartResponse.status}`);
        }
        const chartData = await chartResponse.json();
        setKenyanTopChart(chartData);

        // Set up the current battle with initial dummy votes (real voting will update this)
        if (chartData.length >= 2) {
            setCurrentBattle({
                song1: { ...chartData[0], votes: Math.floor(Math.random() * 500) + 100 }, // Dummy initial votes
                song2: { ...chartData[1], votes: Math.floor(Math.random() * 500) + 100 },
            });
        } else {
            setCurrentBattle(null); // Not enough songs for a battle
        }


      } catch (e) {
        console.error("Error fetching data:", e);
        setError("Failed to load data. Please ensure the backend server is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  const handleVote = async (songId) => {
    // Optimistically update UI (optional, but makes it feel faster)
    setCurrentBattle(prevBattle => {
        if (!prevBattle) return null;
        const newSong1 = { ...prevBattle.song1 };
        const newSong2 = { ...prevBattle.song2 };

        if (newSong1.id === songId) {
            newSong1.votes += 1;
        } else if (newSong2.id === songId) {
            newSong2.votes += 1;
        }
        return { song1: newSong1, song2: newSong2 };
    });

    try {
        const response = await fetch(`${BACKEND_URL}/api/vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ songId }),
        });

        if (!response.ok) {
            throw new Error(`Failed to send vote! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.message);
        // In a real app, you might re-fetch battle data or get updated vote counts from the response
        // For now, our optimistic update is fine for demo.
    } catch (e) {
        console.error("Error sending vote:", e);
        setError("Failed to register vote. Please try again.");
        // If vote fails, you might want to revert the optimistic UI update
        alert("Failed to cast vote. Please check console for details.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-base-300 text-base-content">
        <span className="loading loading-dots loading-lg text-primary"></span>
        <p className="mt-4 text-xl">Loading Skippy Kip goodness...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-base-300 text-error p-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Oops!</h1>
        <p className="text-xl">{error}</p>
        <p className="mt-2 text-lg">Please ensure your backend server is running (check terminal).</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-base-300 text-base-content font-inter">
      <Header />

      <main className="flex-grow container mx-auto p-4 py-8">
        {/* Current Friday Battle Section */}
        {currentBattle && (
            <section className="mb-12">
            <h2 className="text-3xl font-bold text-center text-primary mb-8">
                🎶 Friday's Head-to-Head Battle!
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-16">
                <SongBattleCard song={currentBattle.song1} onVote={handleVote} />
                <div className="text-5xl font-extrabold text-secondary animate-pulse px-4 py-2 rounded-full border-2 border-secondary">
                VS
                </div>
                <SongBattleCard song={currentBattle.song2} onVote={handleVote} />
            </div>
            </section>
        )}
        {!currentBattle && (
             <section className="mb-12 text-center text-base-content">
                <h2 className="text-3xl font-bold text-primary mb-4">No Battle Today!</h2>
                <p className="text-lg">Come back next Friday for the head-to-head song matchups!</p>
                <p className="text-sm opacity-80 mt-2">Currently displaying featured playlists and Kenyan charts below.</p>
            </section>
        )}


        {/* Curated Playlists Section */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-center text-primary mb-8">
            Explore Curated Playlists
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {featuredPlaylists.map(playlist => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </section>

        {/* Kenyan Chart of Most Listened This Week */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center text-accent mb-8">
            🇰🇪 Kenyan Top 10 Chart This Week
          </h2>
          <KenyanTopChart chartData={kenyanTopChart} />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;