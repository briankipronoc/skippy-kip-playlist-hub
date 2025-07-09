import React from "react";

const tracks = [
  { title: "Calm Down", artist: "Rema", duration: "3:39" },
  { title: "Essence", artist: "Wizkid", duration: "4:02" },
  { title: "Last Last", artist: "Burna Boy", duration: "2:50" },
];

const TrackList = () => {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Track List</h2>
      <ul className="space-y-2">
        {tracks.map((track, i) => (
          <li
            key={i}
            className="flex justify-between items-center p-3 bg-base-200 rounded-lg hover:bg-base-300 transition"
          >
            <div>
              <p className="font-semibold">{track.title}</p>
              <p className="text-sm opacity-70">{track.artist}</p>
            </div>
            <span className="text-sm text-gray-500">{track.duration}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackList;