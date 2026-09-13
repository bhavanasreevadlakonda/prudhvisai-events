
import { useEffect, useState } from "react";
import "./Admin.css";
import GalleryAdmin from "./GalleryAdmin";

const API_BASE_URL = "https://prudhvisai-events.onrender.com";

function Admin() {
  const [galleryCount, setGalleryCount] = useState(0);

  useEffect(() => {
  const loadGalleryCount = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/gallery/photos?time=${Date.now()}`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load gallery");
      }

      const data = await response.json();

      console.log("GALLERY DATA:", data);
      console.log("TOTAL PHOTOS:", data.photos.length);

      setGalleryCount(data.photos.length);
    } catch (error) {
      console.error(
        "Unable to load gallery count:",
        error
      );

      setGalleryCount(0);
    }
  };

  loadGalleryCount();
}, []);

  const logout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin";
  };

  return (
    <div className="admin-page">

      {/* SIDEBAR */}
      <aside className="admin-sidebar">

        <div className="admin-logo">
          <span>PS</span>

          <div>
            <h2>PrudhviSai</h2>
            <small>EVENTS ADMIN</small>
          </div>
        </div>

        <nav className="admin-nav">

          <a href="#dashboard">
            🏠 Dashboard
          </a>

          <a href="#gallery">
            📸 Gallery
          </a>

          <a href="#managers">
            👥 Event Managers
          </a>

          <a href="#enquiries">
            📩 Enquiries
          </a>

          <a href="#settings">
            ⚙️ Settings
          </a>

        </nav>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-content">

        <header className="admin-header">

          <div>
            <p>ADMIN DASHBOARD</p>

            <h1>
              Welcome back 👋
            </h1>
          </div>

          <div className="admin-user">

            <div className="user-avatar">
              A
            </div>

            <div>
              <strong>Admin</strong>

              <span>
                PrudhviSai Events
              </span>
            </div>

          </div>

        </header>

        {/* DASHBOARD STATS */}
        <section
          className="admin-stats"
          id="dashboard"
        >

          {/* GALLERY COUNT */}
          <div className="stat-card">

            <span>📸</span>

            <div>
              <p>Gallery Photos</p>

              <h2>
                {galleryCount}
              </h2>
            </div>

          </div>

          {/* EVENT MANAGERS */}
          <div className="stat-card">

            <span>👥</span>

            <div>
              <p>Event Managers</p>

              <h2>3</h2>
            </div>

          </div>

          {/* ENQUIRIES */}
          <div className="stat-card">

            <span>📩</span>

            <div>
              <p>Enquiries</p>

              <h2>0</h2>
            </div>

          </div>

          {/* EVENT CATEGORIES */}
          <div className="stat-card">

            <span>🎉</span>

            <div>
              <p>Event Categories</p>

              <h2>11</h2>
            </div>

          </div>

        </section>

        {/* GALLERY */}
        <section
          className="admin-gallery-section"
          id="gallery"
        >
          <GalleryAdmin />
        </section>

        {/* EVENT MANAGERS */}
        <section
          className="admin-section"
          id="managers"
        >

          <div className="admin-section-heading">

            <div>
              <p>OUR TEAM</p>

              <h2>Event Managers</h2>
            </div>

          </div>

          <div className="manager-admin-grid">

            {/* MANAGER 1 */}
            <div className="manager-admin-card">

              <div className="manager-avatar">
                LM
              </div>

              <h3>Lodi Mahesh</h3>

              <p>9542067689</p>

              <a
                href="https://wa.me/919542067689"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>

            </div>

            {/* MANAGER 2 */}
            <div className="manager-admin-card">

              <div className="manager-avatar">
                GV
              </div>

              <h3>Gattu Vishal</h3>

              <p>7799868060</p>

              <a
                href="https://wa.me/917799868060"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>

            </div>

            {/* MANAGER 3 */}
            <div className="manager-admin-card">

              <div className="manager-avatar">
                PR
              </div>

              <h3>Panjala Raju</h3>

              <p>9177998907</p>

              <a
                href="https://wa.me/919177998907"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>

            </div>

          </div>

        </section>

        {/* ENQUIRIES */}
        <section
          className="admin-section"
          id="enquiries"
        >

          <div className="admin-section-heading">

            <div>
              <p>CUSTOMER MESSAGES</p>

              <h2>Enquiries</h2>
            </div>

          </div>

          <div className="empty-admin-box">

            <div>📩</div>

            <h3>
              No enquiries yet
            </h3>

            <p>
              Customer enquiries will appear here.
            </p>

          </div>

        </section>

        {/* SETTINGS */}
        <section
          className="admin-section"
          id="settings"
        >

          <div className="admin-section-heading">

            <div>
              <p>WEBSITE</p>

              <h2>Settings</h2>
            </div>

          </div>

          <div className="empty-admin-box">

            <div>⚙️</div>

            <h3>
              Website Settings
            </h3>

            <p>
              Additional website settings will be added here.
            </p>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Admin;

