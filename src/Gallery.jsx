import { useEffect, useState } from "react";
import "./Gallery.css";

const API_BASE_URL = "https://prudhvisai-events.onrender.com";

const categories = [
  "All",
  "Marriage",
  "Engagement & Reception",
  "Saree Function",
  "Cradle Ceremony",
  "Birthday",
  "Traditional Function",
  "Srimantham",
  "Haldi Function",
  "Death Ritual",
  "Housewarming Ceremony",
  "Other Events",
];

function Gallery({ initialCategory = "All" }) {
  const [photos, setPhotos] = useState([]);
  const [selectedCategory, setSelectedCategory] =
    useState(initialCategory);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setSelectedCategory(initialCategory || "All");
  }, [initialCategory]);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_BASE_URL}/api/gallery/photos`
        );

        if (!response.ok) {
          throw new Error("Failed to load gallery");
        }

        const data = await response.json();

        const galleryPhotos = (data.photos || []).map((photo) => ({
          ...photo,
          imageUrl:
            photo.url ||
            `${API_BASE_URL}/uploads/${photo.filename}`,
        }));

        setPhotos(galleryPhotos);
      } catch (err) {
        console.error("Gallery error:", err);
        setError(
          "Unable to load photos. Please make sure the server is running."
        );
      } finally {
        setLoading(false);
      }
    };

    loadPhotos();
  }, []);

  const filteredPhotos =
    selectedCategory === "All"
      ? photos
      : photos.filter(
          (photo) =>
            photo.category?.trim().toLowerCase() ===
            selectedCategory.trim().toLowerCase()
        );

  return (
    <div className="public-gallery">

      {/* TITLE */}
      <div className="gallery-title">
        <p>PRUDHVISAI EVENTS</p>

        <h1>Our Event Gallery</h1>

        <span>
          Explore our beautiful event decorations
        </span>
      </div>

      {/* CATEGORIES */}
      <div className="gallery-categories">
        {categories.map((category) => (
          <button
            key={category}
            className={
              selectedCategory === category
                ? "active"
                : ""
            }
            onClick={() =>
              setSelectedCategory(category)
            }
          >
            {category}
          </button>
        ))}
      </div>

      {/* LOADING */}
      {loading && (
        <div className="gallery-status">
          Loading photos...
        </div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <div className="gallery-status gallery-error">
          {error}
        </div>
      )}

      {/* NO PHOTOS */}
      {!loading &&
        !error &&
        filteredPhotos.length === 0 && (
          <div className="gallery-status">
            No photos available for this category.
          </div>
        )}

      {/* PHOTOS */}
      {!loading &&
        !error &&
        filteredPhotos.length > 0 && (
          <div className="public-photo-grid">
            {filteredPhotos.map((photo) => (
              <div
                className="public-photo-card"
                key={photo.filename}
              >
                <img
                  src={photo.imageUrl}
                  alt={
                    photo.originalName ||
                    "PrudhviSai Events"
                  }
                  onError={(e) => {
                    console.error(
                      "Image failed:",
                      photo.imageUrl
                    );

                    e.currentTarget.style.display =
                      "none";
                  }}
                />

                <div className="photo-category">
                  {photo.category}
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}

export default Gallery;