import { useEffect, useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const API_URL = "https://DEIN-BACKEND.onrender.com"; // später ersetzen

  const searchImages = async () => {
    const res = await fetch(`${API_URL}/search?q=${query}`);
    const data = await res.json();
    setResults(data);
  };

  useEffect(() => {
    searchImages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🔎 Meine Bilder-Suchmaschine</h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          className="w-1/2 p-2 border rounded-l"
          placeholder="Suche nach Tags..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchImages} className="bg-blue-500 text-white px-4 rounded-r">
          Suchen
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {results.map((img) => (
          <div key={img.id} className="bg-white p-2 shadow rounded">
            <img
              src={`${API_URL}/images/${img.filename}`}
              alt={img.tags}
              className="w-full h-40 object-cover rounded"
            />
            <p className="text-sm text-gray-600 mt-2">{img.tags}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
