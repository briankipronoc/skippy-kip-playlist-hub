export default function AlbumCard({ image, title, artist }) {
    return (
      <div className="w-64 bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-xl text-white hover:scale-105 transition-transform duration-300">
        <img src={image} alt={title} className="w-full rounded-md mb-4" />
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm text-gray-300">{artist}</p>
      </div>
    );
  }