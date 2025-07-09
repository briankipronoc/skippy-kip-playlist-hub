import AlbumCard from "../components/AlbumCard";

const playlists = [
  {
    image: "https://i.scdn.co/image/ab67616d0000b273e0d09f5e6e870dd5399fc2eb",
    title: "Skippy's Picks",
    artist: "Upbeat Vibes",
  },
  {
    image: "https://i.scdn.co/image/ab67616d0000b2734c6e08eb13a3f1811a9f2606",
    title: "Mood Benders",
    artist: "Chill, Vibe",
  },
  {
    image: "https://i.scdn.co/image/ab67616d0000b273ca7e7f6b22d8711bb7d85b49",
    title: "Late Night Jams",
    artist: "RnB, Soul",
  },
  {
    image: "https://i.scdn.co/image/ab67616d0000b273ef5d981a3e6f6cb3e13918be",
    title: "Afro Heat",
    artist: "Afrobeats",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] to-[#1f1f1f] text-white px-6 py-12">
      <h1 className="text-4xl text-center font-bold mb-4">🎧 Skippy Kip Playlist Hub</h1>
      <p className="text-center text-gray-400 mb-12">
        Curated playlists and Friday song battles. Discover & vibe.
      </p>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
        {playlists.map((album, idx) => (
          <AlbumCard key={idx} {...album} />
        ))}
      </div>
    </div>
  );
}
