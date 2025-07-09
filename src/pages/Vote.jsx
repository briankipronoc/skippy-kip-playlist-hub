import { useState } from "react";

const matchups = [
  {
    songs: [
      { title: "Essence", artist: "Wizkid ft. Tems" },
      { title: "Calm Down", artist: "Rema" },
    ],
  },
  {
    songs: [
      { title: "Attention", artist: "Doja Cat" },
      { title: "As It Was", artist: "Harry Styles" },
    ],
  },
];

export default function Vote() {
  const [votes, setVotes] = useState({});

  const handleVote = (index, choice) => {
    setVotes((prev) => ({ ...prev, [index]: choice }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-4 pb-12 pt-24">
      <div className="fixed top-0 left-0 w-full backdrop-blur-md bg-black/40 text-white z-50 shadow">
        <div className="max-w-4xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-xl font-bold">🎶 Skippy Kip</h1>
          <nav className="space-x-4 text-sm">
            <a href="/" className="hover:text-primary">Home</a>
            <a href="/vote" className="text-primary font-semibold">Vote</a>
            <a href="/results" className="hover:text-primary">Results</a>
          </nav>
        </div>
      </div>

      <h2 className="text-3xl text-center font-bold mb-10">🎚 Friday Song Battle</h2>

      <div className="flex flex-col gap-10 items-center">
        {matchups.map((matchup, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 w-full max-w-xl shadow-xl flex flex-col items-center space-y-4"
          >
            <div className="flex flex-col sm:flex-row justify-between gap-4 w-full">
              {matchup.songs.map((song, i) => (
                <button
                  key={i}
                  onClick={() => handleVote(index, song.title)}
                  className={`w-full sm:w-1/2 text-left transition-all duration-300 px-4 py-6 rounded-xl text-white font-semibold bg-gray-800 hover:bg-primary/70 ${
                    votes[index] === song.title
                      ? "ring-4 ring-primary bg-primary/90 scale-105"
                      : ""
                  }`}
                >
                  <div className="text-lg">{song.title}</div>
                  <div className="text-sm text-gray-300">{song.artist}</div>
                </button>
              ))}
            </div>
            <div className="text-sm text-gray-400 font-light">VS</div>
          </div>
        ))}

        <button className="btn btn-primary mt-4 w-1/2">Submit My Votes</button>
      </div>
    </div>
  );
}