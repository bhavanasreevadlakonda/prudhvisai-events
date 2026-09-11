import { useState } from "react";
import "./App.css";
import Admin from "./admin/Admin";
import Login from "./admin/Login";
import Gallery from "./Gallery";

function App() {
  const [language, setLanguage] = useState("en");

  // ================= GALLERY CATEGORY =================

  const [galleryCategory, setGalleryCategory] =
    useState("All");

  const openGallery = (category) => {
    setGalleryCategory(category);

    setTimeout(() => {
      document
        .getElementById("gallery")
        .scrollIntoView({
          behavior: "smooth",
        });
    }, 50);
  };

  // ================= TRANSLATIONS =================

  const translations = {
    en: {
      home: "Home",
      events: "Events",
      gallery: "Gallery",
      about: "Our Managers",
      contact: "Contact",
      quote: "Contact Us",

      tagline: "MAKING MOMENTS MEMORABLE",
      heroTitle: "Your Dream Event,",
      heroTitle2: "Beautifully Designed.",
      heroText:
        "From elegant weddings to traditional ceremonies, PrudhviSai Events brings your special moments to life with beautiful decorations.",
      explore: "Explore Events →",

      eventsTitle: "Events We Decorate",
      eventsText:
        "Choose your occasion and explore the beautiful decorations created by PrudhviSai Events.",

      marriage: "Marriage",
      engagementReception: "Engagement & Reception",
      saree: "Saree Function",
      cradle: "Cradle Ceremony",
      birthday: "Birthday",
      traditional: "Traditional Function",
      srimantham: "Srimantham",
      haldi: "Haldi Function",
      deathRitual: "Death Ritual",
      housewarming: "Housewarming Ceremony",
      otherEvents: "Other Events",

      marriageText:
        "Beautiful wedding stage and venue decorations.",
      engagementReceptionText:
        "Elegant engagement and reception decorations.",
      sareeText:
        "Traditional and colorful saree function decorations.",
      cradleText:
        "Beautiful decorations for cradle ceremonies.",
      birthdayText:
        "Creative and colorful birthday decorations.",
      traditionalText:
        "Beautiful decorations for traditional celebrations.",
      srimanthamText:
        "Beautiful traditional decorations for Srimantham ceremonies.",
      haldiText:
        "Bright and vibrant decorations for Haldi functions.",
      deathRitualText:
        "Respectful arrangements for traditional death rituals.",
      housewarmingText:
        "Beautiful and traditional decorations for housewarming ceremonies.",
      otherEventsText:
        "Customized decoration services for other special occasions.",

      viewGallery: "View Gallery →",

      galleryTitle: "Our Event Gallery",
      galleryText:
        "Explore some of the beautiful decorations created by our team.",

      weddingDecoration: "Wedding Decoration",
      engagementDecoration: "Engagement & Reception",
      traditionalDecoration: "Traditional Function",
      stageDecoration: "Stage Decoration",
      flowerDecoration: "Flower Decoration",
      eventDecoration: "Event Decoration",

      whyTitle: "Why Choose PrudhviSai Events?",
      whyText:
        "We make every celebration beautiful, memorable and special. Our experienced team takes care of every detail of your event.",

      creativeTitle: "Creative Designs",
      creativeText:
        "Unique decoration ideas for every occasion.",

      qualityTitle: "Quality Work",
      qualityText:
        "We focus on quality materials and beautiful finishing.",

      teamTitle: "Experienced Team",
      teamText:
        "Our event managers handle every detail professionally.",

      timeTitle: "On-Time Service",
      timeText:
        "We make sure your decoration is ready on time.",

      managersTitle: "Our Event Managers",
      managersText:
        "Meet our event managers and contact them directly for your event requirements.",

      partner: "EVENT MANAGER",
      eventManager: "PrudhviSai Events",

      call: "Call",
      whatsapp: "WhatsApp",

      contactTitle:
        "Let's Create Something Beautiful",
      contactText:
        "Tell us about your event and contact our event managers for decoration details and a quotation.",

      contactButton:
        "Contact Event Manager →",

      footerText:
        "Making your special moments beautiful.",

      rights:
        "© 2026 PrudhviSai Events. All rights reserved.",
    },

    // ================= TELUGU =================

    te: {
      home: "హోమ్",
      events: "ఈవెంట్స్",
      gallery: "గ్యాలరీ",
      about: "మా మేనేజర్లు",
      contact: "కాంటాక్ట్",
      quote: "మమ్మల్ని సంప్రదించండి",

      tagline:
        "మీ క్షణాలను మరపురానివిగా మార్చండి",

      heroTitle: "మీ కలల ఈవెంట్,",

      heroTitle2:
        "అందంగా డిజైన్ చేయబడింది.",

      heroText:
        "అందమైన వివాహాలు మరియు సంప్రదాయ కార్యక్రమాలకు PrudhviSai Events ప్రత్యేకమైన అలంకరణలను అందిస్తుంది.",

      explore:
        "ఈవెంట్స్ చూడండి →",

      eventsTitle:
        "మేము అలంకరించే ఈవెంట్స్",

      eventsText:
        "మీ కార్యక్రమాన్ని ఎంచుకుని PrudhviSai Events అందించే అందమైన అలంకరణలను చూడండి.",

      marriage: "వివాహం",

      engagementReception:
        "నిశ్చితార్థం & రిసెప్షన్",

      saree: "సారె ఫంక్షన్",

      cradle: "ఊయల వేడుక",

      birthday: "పుట్టినరోజు",

      traditional:
        "సంప్రదాయ కార్యక్రమం",

      srimantham: "శ్రీమంతం",

      haldi: "హల్దీ ఫంక్షన్",

      deathRitual:
        "మరణ సంస్కారం",

      housewarming:
        "గృహప్రవేశం",

      otherEvents:
        "ఇతర కార్యక్రమాలు",

      marriageText:
        "అందమైన వివాహ స్టేజ్ మరియు వేదిక అలంకరణలు.",

      engagementReceptionText:
        "అందమైన నిశ్చితార్థం మరియు రిసెప్షన్ అలంకరణలు.",

      sareeText:
        "సాంప్రదాయ మరియు రంగురంగుల సారె ఫంక్షన్ అలంకరణలు.",

      cradleText:
        "అందమైన ఊయల వేడుక అలంకరణలు.",

      birthdayText:
        "క్రియేటివ్ మరియు రంగురంగుల పుట్టినరోజు అలంకరణలు.",

      traditionalText:
        "సంప్రదాయ వేడుకల కోసం అందమైన అలంకరణలు.",

      srimanthamText:
        "శ్రీమంతం వేడుక కోసం అందమైన సంప్రదాయ అలంకరణలు.",

      haldiText:
        "హల్దీ ఫంక్షన్ కోసం ప్రకాశవంతమైన మరియు రంగురంగుల అలంకరణలు.",

      deathRitualText:
        "సంప్రదాయ మరణ సంస్కారాల కోసం గౌరవప్రదమైన ఏర్పాట్లు.",

      housewarmingText:
        "గృహప్రవేశం వేడుక కోసం అందమైన మరియు సంప్రదాయ అలంకరణలు.",

      otherEventsText:
        "ఇతర ప్రత్యేక కార్యక్రమాలకు మీ అవసరాలకు అనుగుణంగా అలంకరణ సేవలు.",

      viewGallery:
        "గ్యాలరీ చూడండి →",

      galleryTitle:
        "మా ఈవెంట్ గ్యాలరీ",

      galleryText:
        "మా బృందం రూపొందించిన అందమైన అలంకరణలను చూడండి.",

      weddingDecoration:
        "వివాహ అలంకరణ",

      engagementDecoration:
        "నిశ్చితార్థం & రిసెప్షన్",

      traditionalDecoration:
        "సంప్రదాయ కార్యక్రమం",

      stageDecoration:
        "స్టేజ్ అలంకరణ",

      flowerDecoration:
        "పూల అలంకరణ",

      eventDecoration:
        "ఈవెంట్ అలంకరణ",

      whyTitle:
        "PrudhviSai Events ఎందుకు?",

      whyText:
        "ప్రతి వేడుక అందంగా మరియు గుర్తుండిపోయేలా చేయడం మా లక్ష్యం. మా అనుభవజ్ఞులైన బృందం ప్రతి వివరాన్ని చూసుకుంటుంది.",

      creativeTitle:
        "క్రియేటివ్ డిజైన్లు",

      creativeText:
        "ప్రతి కార్యక్రమానికి ప్రత్యేకమైన అలంకరణ ఆలోచనలు.",

      qualityTitle:
        "నాణ్యమైన పని",

      qualityText:
        "నాణ్యమైన మెటీరియల్స్ మరియు అందమైన ఫినిషింగ్‌పై శ్రద్ధ.",

      teamTitle:
        "అనుభవజ్ఞులైన బృందం",

      teamText:
        "మా ఈవెంట్ మేనేజర్లు ప్రతి వివరాన్ని ప్రొఫెషనల్‌గా నిర్వహిస్తారు.",

      timeTitle:
        "సమయానికి సేవ",

      timeText:
        "మీ ఈవెంట్ అలంకరణను సమయానికి సిద్ధం చేస్తాము.",

      managersTitle:
        "మా ఈవెంట్ మేనేజర్లు",

      managersText:
        "మా ఈవెంట్ మేనేజర్లను తెలుసుకుని మీ కార్యక్రమం కోసం నేరుగా సంప్రదించండి.",

      partner:
        "ఈవెంట్ మేనేజర్",

      eventManager:
        "PrudhviSai Events",

      call: "కాల్",

      whatsapp:
        "వాట్సాప్",

      contactTitle:
        "అందమైన వేడుకను కలిసి సృష్టిద్దాం",

      contactText:
        "మీ ఈవెంట్ గురించి మాకు చెప్పండి. అలంకరణ వివరాలు మరియు కోట్ కోసం మా ఈవెంట్ మేనేజర్లను సంప్రదించండి.",

      contactButton:
        "ఈవెంట్ మేనేజర్‌ను సంప్రదించండి →",

      footerText:
        "మీ ప్రత్యేక క్షణాలను మరింత అందంగా చేస్తాము.",

      rights:
        "© 2026 PrudhviSai Events. అన్ని హక్కులు ప్రత్యేకించబడ్డాయి.",
    },
  };

  const t = translations[language];

  return (
    <div className="website">

      {/* ================= NAVBAR ================= */}

      <header className="navbar">

        <div className="logo">

          <span>PS</span>

          <div>
            <h2>PrudhviSai</h2>
            <small>EVENTS</small>
          </div>

        </div>

        <nav>

          <a href="#home">
            {t.home}
          </a>

          <a href="#events">
            {t.events}
          </a>

          <a href="#gallery">
            {t.gallery}
          </a>

          <a href="#about">
            {t.about}
          </a>

          <a href="#contact">
            {t.contact}
          </a>

        </nav>

        {/* LANGUAGE */}

        <div className="language">

          <select
            value={language}
            onChange={(e) =>
              setLanguage(e.target.value)
            }
          >

            <option value="en">
              English
            </option>

            <option value="te">
              తెలుగు
            </option>

          </select>

        </div>

        {/* CONTACT BUTTON */}

        <button
          className="quote-btn"
          onClick={() =>
            document
              .getElementById("contact")
              .scrollIntoView({
                behavior: "smooth",
              })
          }
        >
          {t.quote}
        </button>

      </header>


      {/* ================= HERO ================= */}

      <section
        className="hero"
        id="home"
      >

        <div className="hero-content">

          <p className="tagline">
            ✨ {t.tagline} ✨
          </p>

          <h1>

            {t.heroTitle}

            <br />

            <span>
              {t.heroTitle2}
            </span>

          </h1>

          <p className="hero-text">
            {t.heroText}
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() =>
                document
                  .getElementById("events")
                  .scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              {t.explore}
            </button>

            <button
              className="secondary-btn"
              onClick={() =>
                document
                  .getElementById("contact")
                  .scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              {t.quote}
            </button>

          </div>

        </div>

      </section>


      {/* ================= EVENTS ================= */}

      <section
        className="section"
        id="events"
      >

        <div className="section-title">

          <p>OUR SERVICES</p>

          <h2>
            {t.eventsTitle}
          </h2>

          <span>
            {t.eventsText}
          </span>

        </div>


        <div className="event-grid">


          {/* ================= 1 MARRIAGE ================= */}

          <div className="event-card">

            <div className="event-image marriage">
              💍
            </div>

            <div className="event-info">

              <h3>
                {t.marriage}
              </h3>

              <p>
                {t.marriageText}
              </p>

              <button
                onClick={() =>
                  openGallery("Marriage")
                }
              >
                {t.viewGallery}
              </button>

            </div>

          </div>


          {/* ================= 2 ENGAGEMENT ================= */}

          <div className="event-card">

            <div className="event-image engagement">
              💐
            </div>

            <div className="event-info">

              <h3>
                {t.engagementReception}
              </h3>

              <p>
                {t.engagementReceptionText}
              </p>

              <button
                onClick={() =>
                  openGallery(
                    "Engagement & Reception"
                  )
                }
              >
                {t.viewGallery}
              </button>

            </div>

          </div>


          {/* ================= 3 SAREE ================= */}

          <div className="event-card">

            <div className="event-image saree">
              🌸
            </div>

            <div className="event-info">

              <h3>
                {t.saree}
              </h3>

              <p>
                {t.sareeText}
              </p>

              <button
                onClick={() =>
                  openGallery(
                    "Saree Function"
                  )
                }
              >
                {t.viewGallery}
              </button>

            </div>

          </div>


          {/* ================= 4 CRADLE ================= */}

          <div className="event-card">

            <div className="event-image cradle">
              👶
            </div>

            <div className="event-info">

              <h3>
                {t.cradle}
              </h3>

              <p>
                {t.cradleText}
              </p>

              <button
                onClick={() =>
                  openGallery(
                    "Cradle Ceremony"
                  )
                }
              >
                {t.viewGallery}
              </button>

            </div>

          </div>


          {/* ================= 5 BIRTHDAY ================= */}

          <div className="event-card">

            <div className="event-image birthday">
              🎂
            </div>

            <div className="event-info">

              <h3>
                {t.birthday}
              </h3>

              <p>
                {t.birthdayText}
              </p>

              <button
                onClick={() =>
                  openGallery("Birthday")
                }
              >
                {t.viewGallery}
              </button>

            </div>

          </div>


          {/* ================= 6 TRADITIONAL ================= */}

          <div className="event-card">

            <div className="event-image traditional">
              🪔
            </div>

            <div className="event-info">

              <h3>
                {t.traditional}
              </h3>

              <p>
                {t.traditionalText}
              </p>

              <button
                onClick={() =>
                  openGallery(
                    "Traditional Function"
                  )
                }
              >
                {t.viewGallery}
              </button>

            </div>

          </div>


          {/* ================= 7 SRIMANTHAM ================= */}

          <div className="event-card">

            <div className="event-image srimantham">
              🤰
            </div>

            <div className="event-info">

              <h3>
                {t.srimantham}
              </h3>

              <p>
                {t.srimanthamText}
              </p>

              <button
                onClick={() =>
                  openGallery("Srimantham")
                }
              >
                {t.viewGallery}
              </button>

            </div>

          </div>


          {/* ================= 8 HALDI ================= */}

          <div className="event-card">

            <div className="event-image haldi">
              🌼
            </div>

            <div className="event-info">

              <h3>
                {t.haldi}
              </h3>

              <p>
                {t.haldiText}
              </p>

              <button
                onClick={() =>
                  openGallery(
                    "Haldi Function"
                  )
                }
              >
                {t.viewGallery}
              </button>

            </div>

          </div>


          {/* ================= 9 DEATH RITUAL ================= */}

          <div className="event-card">

            <div className="event-image funeral-rites">
              🕊️
            </div>

            <div className="event-info">

              <h3>
                {t.deathRitual}
              </h3>

              <p>
                {t.deathRitualText}
              </p>

              <button
                onClick={() =>
                  openGallery(
                    "Death Ritual"
                  )
                }
              >
                {t.viewGallery}
              </button>

            </div>

          </div>


          {/* ================= 10 HOUSEWARMING ================= */}

          <div className="event-card">

            <div className="event-image housewarming">
              🏠
            </div>

            <div className="event-info">

              <h3>
                {t.housewarming}
              </h3>

              <p>
                {t.housewarmingText}
              </p>

              <button
                onClick={() =>
                  openGallery(
                    "Housewarming Ceremony"
                  )
                }
              >
                {t.viewGallery}
              </button>

            </div>

          </div>


          {/* ================= 11 OTHER EVENTS ================= */}

          <div className="event-card">

            <div className="event-image other-events">
              ✨
            </div>

            <div className="event-info">

              <h3>
                {t.otherEvents}
              </h3>

              <p>
                {t.otherEventsText}
              </p>

              <button
                onClick={() =>
                  openGallery(
                    "Other Events"
                  )
                }
              >
                {t.viewGallery}
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* ================= WHY US ================= */}

      <section className="why-us">

        <div>

          <p className="small-title">
            WHY US
          </p>

          <h2>
            {t.whyTitle}
          </h2>

          <p>
            {t.whyText}
          </p>

        </div>


        <div className="features">

          <div>

            <strong>01</strong>

            <h3>
              {t.creativeTitle}
            </h3>

            <p>
              {t.creativeText}
            </p>

          </div>


          <div>

            <strong>02</strong>

            <h3>
              {t.qualityTitle}
            </h3>

            <p>
              {t.qualityText}
            </p>

          </div>


          <div>

            <strong>03</strong>

            <h3>
              {t.teamTitle}
            </h3>

            <p>
              {t.teamText}
            </p>

          </div>


          <div>

            <strong>04</strong>

            <h3>
              {t.timeTitle}
            </h3>

            <p>
              {t.timeText}
            </p>

          </div>

        </div>

      </section>


      {/* ================= PUBLIC GALLERY ================= */}

      <section id="gallery">

        <Gallery
          initialCategory={
            galleryCategory
          }
        />

      </section>


      {/* ================= EVENT MANAGERS ================= */}

      <section
        className="about"
        id="about"
      >

        <div className="about-content">

          <p className="small-title">
            OUR TEAM
          </p>

          <h2>
            {t.managersTitle}
          </h2>

          <p>
            {t.managersText}
          </p>


          <div className="partners">


            {/* ================= LODI MAHESH ================= */}

            <div className="manager-card">

              <div className="manager-photo">
                👤
              </div>

              <span>
                {t.partner}
              </span>

              <h3>
                Lodi Mahesh
              </h3>

              <p>
                {t.eventManager}
              </p>


              <div className="manager-buttons">

                <a
                  href="tel:9542067689"
                  className="manager-contact"
                >
                  📞 {t.call}
                </a>

                <a
                  href="https://wa.me/919542067689"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="manager-whatsapp"
                >
                  💬 {t.whatsapp}
                </a>

              </div>

            </div>


            {/* ================= GATTU VISHAL ================= */}

            <div className="manager-card">

              <div className="manager-photo">
                👤
              </div>

              <span>
                {t.partner}
              </span>

              <h3>
                Gattu Vishal
              </h3>

              <p>
                {t.eventManager}
              </p>


              <div className="manager-buttons">

                <a
                  href="tel:7799868060"
                  className="manager-contact"
                >
                  📞 {t.call}
                </a>

                <a
                  href="https://wa.me/917799868060"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="manager-whatsapp"
                >
                  💬 {t.whatsapp}
                </a>

              </div>

            </div>


            {/* ================= PANJALA RAJU ================= */}

            <div className="manager-card">

              <div className="manager-photo">
                👤
              </div>

              <span>
                {t.partner}
              </span>

              <h3>
                Panjala Raju
              </h3>

              <p>
                {t.eventManager}
              </p>


              <div className="manager-buttons">

                <a
                  href="tel:9177998907"
                  className="manager-contact"
                >
                  📞 {t.call}
                </a>

                <a
                  href="https://wa.me/919177998907"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="manager-whatsapp"
                >
                  💬 {t.whatsapp}
                </a>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= CONTACT ================= */}

      <section
        className="contact"
        id="contact"
      >

        <p className="small-title">
          GET IN TOUCH
        </p>

        <h2>
          {t.contactTitle}
        </h2>

        <p>
          {t.contactText}
        </p>

        <button
          className="primary-btn"
          onClick={() =>
            document
              .getElementById("about")
              .scrollIntoView({
                behavior: "smooth",
              })
          }
        >
          {t.contactButton}
        </button>

      </section>


      {/* ================= FOOTER ================= */}

      <footer>

        <div>

          <h2>
            PrudhviSai Events
          </h2>

          <p>
            {t.footerText}
          </p>

        </div>

        <p>
          {t.rights}
        </p>

      </footer>

    </div>
  );
}


/* ================================================= */
/* ================= ADMIN ROUTING ================= */
/* ================================================= */

function Root() {

  const path =
    window.location.pathname;

  const [isLoggedIn, setIsLoggedIn] =
    useState(
      !!localStorage.getItem(
        "adminToken"
      )
    );


  if (path === "/admin") {

    if (!isLoggedIn) {

      return (
        <Login
          onLogin={() =>
            setIsLoggedIn(true)
          }
        />
      );

    }

    return <Admin />;

  }


  return <App />;
}


export default Root;