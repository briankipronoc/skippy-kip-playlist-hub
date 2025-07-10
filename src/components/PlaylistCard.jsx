// src/components/PlaylistCard.jsx
import React from 'react';

const PlaylistCard = ({ playlist }) => {
  // Spotify playlist objects have 'name', 'description', 'images' array, 'external_urls.spotify'
  const imageUrl = playlist.images && playlist.images.length > 0
    ? playlist.images[0].url // Get the first image (usually largest)
    : 'https://via.placeholder.com/400?text=No+Cover'; // Fallback image

  const spotifyUrl = playlist.external_urls ? playlist.external_urls.spotify : '#'; // Fallback for URL

  return (
    <div className="card w-full bg-base-200 shadow-xl compact overflow-hidden
                    hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 ease-in-out
                    border border-base-content/10 cursor-pointer"> {/* Added cursor-pointer */}
      <figure className="relative pt-[100%]">
        <img
          src={imageUrl}
          alt={`${playlist.name} Cover`}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-xl text-primary mb-1 line-clamp-1">{playlist.name}</h2>
        <p className="text-sm text-base-content opacity-80 line-clamp-2">
          {playlist.description || 'No description available.'} {/* Handle missing description */}
        </p>
        <div className="card-actions justify-end mt-4">
          <a
            href={spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-outline btn-primary text-xs hover:bg-primary hover:text-white transition-all duration-200"
          >
            Listen on Spotify
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" className="w-4 h-4 ml-1">
                <path fill="currentColor" d="M248 8C111.9 8 0 119.9 0 256s111.9 248 248 248 248-111.9 248-248S384.1 8 248 8zm126.5 351.3c-2.3 0-4.6-1.3-5.7-3.4-14.8-27.7-41.9-36.4-90.8-36.4-8.8 0-17.6 1.8-25.9 5.5-2.7 1.2-5.7.5-7.7-1.7s-2.7-5.5-1.7-8.7c14.2-35.7 49.3-46.9 92.7-46.9 23.3 0 44.9 6.2 60.9 19.4 3.7 3.2 4.6 8.7 2.4 13.5-2.3 4.8-7.9 7.6-12.7 5.3zm-39-95.2c-2.8 0-5.5-1.6-6.9-4.3-17.7-34.9-59-46.2-106.7-46.2-10.7 0-21.4 2-31.5 6.4-3.5 1.5-7.2.7-9.7-2.2s-3.5-6.8-2.2-10.5c17.9-47.5 70.8-61.9 123.8-61.9 26.6 0 51.5 7 70.2 22.3 3.9 3.3 5.7 8.9 4 13.8-1.8 4.8-7.2 7.8-12 6zm10.7-90.8c-3.1 0-6-1.8-7.5-5-19.9-41.5-74.8-54.7-130.5-54.7-13.6 0-27.2 2.4-40 7.3-3.9 1.5-7.8.4-10.5-2.7s-4.3-7.6-2.7-11.6c20.7-49.8 79.4-65.2 138.8-65.2 29.5 0 57.1 8 78.8 25 4.3 3.4 6.2 9.2 4 14.7-2.3 5.4-8.2 8.5-13.6 6.2z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;