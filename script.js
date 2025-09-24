const images = [
  { src: "bilder/blume.jpg", tags: ["blume", "natur", "garten"] },
  { src: "bilder/katze.jpg", tags: ["katze", "tier", "haustier"] },
  { src: "bilder/strand.jpg", tags: ["strand", "meer", "urlaub"] }
];

const gallery = document.getElementById("gallery");
const searchInput = document.getElementById("searchInput");

function renderImages(filter = "") {
  gallery.innerHTML = "";
  const filtered = images.filter(img =>
    img.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
  );
  filtered.forEach(img => {
    const el = document.createElement("img");
    el.src = img.src;
    el.alt = img.tags.join(", ");
    gallery.appendChild(el);
  });
}

searchInput.addEventListener("input", e => {
  renderImages(e.target.value);
});

// Initial laden
renderImages();
