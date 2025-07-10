// src/components/KenyanTopChart.jsx
import React from 'react';

const KenyanTopChart = ({ chartData }) => {
  if (!chartData || chartData.length === 0) {
    return (
      <div className="text-center text-base-content opacity-70 p-8 rounded-lg bg-base-200">
        <p className="text-lg">No Kenyan Top Chart data available right now.</p>
        <p className="text-sm mt-2">Check back later or try refreshing the page.</p>
      </div>
    );
  }

  return (
    <div className="bg-base-200 shadow-xl rounded-box p-6">
      <ul className="space-y-4">
        {chartData.map((song, index) => (
          <li key={song.id} className="flex items-center gap-4 bg-base-300 p-4 rounded-lg
                                      hover:bg-base-100 transition-colors duration-200">
            <span className="text-3xl font-bold text-primary w-10 flex-shrink-0 text-center">
              #{index + 1}
            </span>
            <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden shadow-md">
              <img
                src={song.albumArt || 'https://via.placeholder.com/100?text=No+Art'}
                alt={`${song.title} Album Art`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-base-content line-clamp-1">{song.title}</h3>
              <p className="text-sm text-base-content opacity-80 line-clamp-1">{song.artist}</p>
            </div>
            {song.previewUrl && (
                <div className="flex-shrink-0">
                    <audio controls src={song.previewUrl} className="w-24">
                        Your browser does not support the audio element.
                    </audio>
                </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KenyanTopChart;