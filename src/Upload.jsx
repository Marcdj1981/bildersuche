import { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState("");

  const API_URL = "https://DEIN-BACKEND.onrender.com"; // später ersetzen

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("tags", tags);

    await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    alert("Upload erfolgreich!");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">📤 Bild hochladen</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <input
        type="text"
        placeholder="Tags (kommasepariert)"
        className="ml-2 border p-1"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <button
        onClick={uploadImage}
        className="ml-2 bg-green-500 text-white px-4 py-1 rounded"
      >
        Hochladen
      </button>
    </div>
  );
}
