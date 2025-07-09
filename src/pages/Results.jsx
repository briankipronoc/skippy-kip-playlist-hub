const results = [
  { pair: ["Essence", "Calm Down"], votes: [12, 8] },
  { pair: ["Attention", "As It Was"], votes: [6, 14] },
  { pair: ["Song C1", "Song C2"], votes: [10, 10] },
];

export default function Results() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-10">📊 Voting Results</h2>

      <div className="grid gap-6 max-w-3xl mx-auto">
        {results.map(({ pair, votes }, idx) => (
          <div
            key={idx}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-md flex items-center justify-between"
          >
            <div className="text-left">
              <div className="font-semibold">{pair[0]}</div>
              <div className="text-sm text-green-400">{votes[0]} votes</div>
            </div>
            <div className="font-bold text-gray-300">vs</div>
            <div className="text-right">
              <div className="font-semibold">{pair[1]}</div>
              <div className="text-sm text-green-400">{votes[1]} votes</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
