import { useEffect, useState } from "react";
import "./GalleryAdmin.css";

const API_BASE_URL = "http://localhost:5000";

const eventCategories = [
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

function GalleryAdmin() {
  const [selectedCategory, setSelectedCategory] =
    useState("Marriage");

  const [photos, setPhotos] = useState([]);

  const [uploading, setUploading] = useState(false);

  const [message, setMessage] = useState("");

  const [deleting, setDeleting] = useState(null);


  // ======================================
  // LOAD SAVED PHOTOS
  // ======================================

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/gallery/photos`
        );

        const data = await response.json();

        if (!response.ok) {
          setMessage(
            data.message ||
              "Unable to load photos."
          );
          return;
        }

        setPhotos(data.photos || []);
      } catch (error) {
        console.error(error);

        setMessage(
          "Unable to connect to the server."
        );
      }
    };

    loadPhotos();
  }, []);


  // ======================================
  // UPLOAD PHOTOS
  // ======================================

  const handlePhotoSelect = async (event) => {
    const files = Array.from(
      event.target.files
    );

    if (files.length === 0) {
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      const formData = new FormData();

      formData.append(
        "category",
        selectedCategory
      );

      files.forEach((file) => {
        formData.append(
          "photos",
          file
        );
      });

      const response = await fetch(
        `${API_BASE_URL}/api/gallery/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        setMessage(
          data.message ||
            "Upload failed."
        );

        setUploading(false);
        return;
      }

      setPhotos(
        (previousPhotos) => [
          ...previousPhotos,
          ...(data.photos || []),
        ]
      );

      setMessage(
        "Photos uploaded successfully! ✓"
      );
    } catch (error) {
      console.error(error);

      setMessage(
        "Unable to connect to the server."
      );
    }

    setUploading(false);

    event.target.value = "";
  };


  // ======================================
  // DELETE PHOTO
  // ======================================

  const deletePhoto = async (filename) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this photo?"
      );

    if (!confirmDelete) {
      return;
    }

    setDeleting(filename);
    setMessage("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/gallery/photos/${encodeURIComponent(
          filename
        )}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        setMessage(
          data.message ||
            "Unable to delete photo."
        );

        setDeleting(null);
        return;
      }

      setPhotos(
        (previousPhotos) =>
          previousPhotos.filter(
            (photo) =>
              photo.filename !==
              filename
          )
      );

      setMessage(
        "Photo deleted successfully! ✓"
      );
    } catch (error) {
      console.error(error);

      setMessage(
        "Unable to connect to the server."
      );
    }

    setDeleting(null);
  };


  // ======================================
  // FILTER CATEGORY
  // ======================================

  const categoryPhotos =
    photos.filter(
      (photo) =>
        photo.category ===
        selectedCategory
    );


  // ======================================
  // PAGE
  // ======================================

  return (
    <div className="gallery-admin-page">

      <div className="gallery-admin-header">

        <div>
          <p>
            GALLERY MANAGEMENT
          </p>

          <h1>
            Manage Event Photos
          </h1>
        </div>

        <label className="upload-button">

          {uploading
            ? "Uploading..."
            : "+ Upload Photos"}

          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            multiple
            onChange={
              handlePhotoSelect
            }
            disabled={uploading}
          />

        </label>

      </div>


      {message && (
        <div className="gallery-message">
          {message}
        </div>
      )}


      <div className="gallery-admin-content">

        {/* CATEGORY PANEL */}

        <div className="category-panel">

          <h3>
            Event Categories
          </h3>

          {eventCategories.map(
            (category) => (
              <button
                key={category}
                className={
                  selectedCategory ===
                  category
                    ? "category-btn active"
                    : "category-btn"
                }
                onClick={() =>
                  setSelectedCategory(
                    category
                  )
                }
              >
                {category}
              </button>
            )
          )}

        </div>


        {/* PHOTOS PANEL */}

        <div className="photos-panel">

          <div className="photos-heading">

            <div>

              <p>
                SELECTED CATEGORY
              </p>

              <h2>
                {selectedCategory}
              </h2>

            </div>

            <span>
              {categoryPhotos.length}{" "}
              Photos
            </span>

          </div>


          {categoryPhotos.length ===
          0 ? (

            <div className="empty-gallery">

              <div className="empty-icon">
                📸
              </div>

              <h3>
                No photos yet
              </h3>

              <p>
                Upload photos for{" "}
                {selectedCategory}.
              </p>

              <label className="empty-upload-button">

                Upload Photos

                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  multiple
                  onChange={
                    handlePhotoSelect
                  }
                  disabled={uploading}
                />

              </label>

            </div>

          ) : (

            <div className="photo-grid">

              {categoryPhotos.map(
                (photo) => (

                  <div
                    className="photo-card"
                    key={
                      photo.filename
                    }
                  >

                    <img
                      src={photo.url}
                      alt={
                        photo.originalName
                      }
                    />

                    <div className="photo-card-bottom">

                      <span>
                        {
                          photo.originalName
                        }
                      </span>

                      <button
                        onClick={() =>
                          deletePhoto(
                            photo.filename
                          )
                        }
                        disabled={
                          deleting ===
                          photo.filename
                        }
                      >
                        {deleting ===
                        photo.filename
                          ? "Deleting..."
                          : "Delete"}
                      </button>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default GalleryAdmin;