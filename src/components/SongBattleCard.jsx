// src/components/SongBattleCard.jsx
import React from 'react';

const SongBattleCard = ({ song, onVote }) => {
  return (
    <div className="card w-full max-w-sm bg-base-100 shadow-xl compact overflow-hidden
                    hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 ease-in-out
                    border border-primary/20 flex flex-col items-center p-4"> {/* Added flex-col and p-4 */}
      <figure className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden">
        <img
          src={song.albumArt || 'https://via.placeholder.com/400?text=No+Album+Art'}
          alt={`${song.title} Album Art`}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        {/* Optional: Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <button className="btn btn-circle btn-lg btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </figure>

      <div className="text-center w-full">
        <h3 className="card-title justify-center text-2xl text-primary font-bold mb-1 line-clamp-1">{song.title}</h3>
        <p className="text-lg text-base-content opacity-90 mb-4 line-clamp-1">{song.artist}</p>

        {/* Voting Section */}
        <div className="flex flex-col items-center mt-auto"> {/* mt-auto for pushing to bottom */}
          <span className="text-xl font-semibold text-accent mb-2">Votes: {song.votes || 0}</span>
          <button
            className="btn btn-secondary btn-lg w-full max-w-[200px] hover:btn-success
                       transform active:scale-95 transition-all duration-150 ease-out"
            onClick={() => onVote(song.id)}
          >
            Vote for this Song!
          </button>
        </div>
      </div>
    </div>
  );
};

export default SongBattleCard;