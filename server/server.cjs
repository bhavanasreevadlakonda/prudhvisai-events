const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


// ======================================
// IMAGE UPLOAD SETUP
// ======================================

const uploadFolder = path.join(__dirname, "..", "uploads");

console.log("Upload folder:", uploadFolder);

if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
  console.log("Uploads folder created.");
}


// ======================================
// GALLERY DATA FILE
// ======================================

const galleryFile = path.join(
  __dirname,
  "..",
  "gallery.json"
);

if (!fs.existsSync(galleryFile)) {
  fs.writeFileSync(
    galleryFile,
    JSON.stringify([], null, 2)
  );

  console.log("gallery.json created.");
}


// ======================================
// READ GALLERY DATA
// ======================================

function readGallery() {
  try {
    const data = fs.readFileSync(
      galleryFile,
      "utf8"
    );

    return JSON.parse(data);
  } catch (error) {
    console.error(
      "Unable to read gallery.json:",
      error
    );

    return [];
  }
}


// ======================================
// SAVE GALLERY DATA
// ======================================

function saveGallery(gallery) {
  fs.writeFileSync(
    galleryFile,
    JSON.stringify(gallery, null, 2)
  );
}


// ======================================
// MULTER STORAGE
// ======================================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(
      "Saving file to:",
      uploadFolder
    );

    cb(null, uploadFolder);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    console.log(
      "Saving as:",
      uniqueName
    );

    cb(null, uniqueName);
  },
});


// ======================================
// MULTER CONFIGURATION
// ======================================

const upload = multer({
  storage: storage,

  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    console.log(
      "Received file:",
      file.originalname
    );

    console.log(
      "File type:",
      file.mimetype
    );

    if (
      allowedTypes.includes(
        file.mimetype
      )
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only JPG, JPEG, PNG and WEBP images are allowed."
        )
      );
    }
  },
});


// ======================================
// MAKE UPLOADED IMAGES ACCESSIBLE
// ======================================

app.use(
  "/uploads",
  express.static(uploadFolder)
);


// ======================================
// ADMIN LOGIN
// ======================================

app.post(
  "/api/admin/login",
  (req, res) => {
    const {
      email,
      password,
    } = req.body;

    if (
      email ===
        process.env.ADMIN_EMAIL &&
      password ===
        process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        {
          email: email,
          role: "admin",
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h",
        }
      );

      return res.json({
        message:
          "Login successful",
        token: token,
      });
    }

    return res.status(401).json({
      message:
        "Invalid email or password",
    });
  }
);


// ======================================
// GALLERY PHOTO UPLOAD
// ======================================

app.post(
  "/api/gallery/upload",
  upload.array("photos", 20),
  (req, res) => {
    console.log(
      "\n========== PHOTO UPLOAD =========="
    );

    const category =
      req.body.category ||
      "Other Events";

    console.log(
      "Category:",
      category
    );

    if (
      !req.files ||
      req.files.length === 0
    ) {
      console.log(
        "NO FILES RECEIVED"
      );

      return res.status(400).json({
        message:
          "No photos were received by the server.",
      });
    }

    console.log(
      "Number of files:",
      req.files.length
    );

    // Read existing gallery data
    const gallery = readGallery();

    // Create data for uploaded photos
    const uploadedPhotos =
      req.files.map((file) => {
        console.log(
          "Saved:",
          file.path
        );

        return {
          filename:
            file.filename,

          originalName:
            file.originalname,

          category:
            category,

         url:
  `${req.protocol}://${req.get("host")}/uploads/` +
  file.filename,
        };
      });

    // Add new photos
    gallery.push(
      ...uploadedPhotos
    );

    // Save permanently
    saveGallery(gallery);

    console.log(
      "Gallery data saved."
    );

    console.log(
      "UPLOAD SUCCESS"
    );

    console.log(
      "=================================\n"
    );

    return res.json({
      message:
        "Photos uploaded successfully.",

      photos:
        uploadedPhotos,
    });
  }
);


// ======================================
// GET ALL GALLERY PHOTOS
// ======================================

app.get(
  "/api/gallery/photos",
  (req, res) => {
    try {
      const gallery =
        readGallery();

      console.log(
        "Gallery photos found:",
        gallery.length
      );

      return res.json({
        photos: gallery,
      });

    } catch (error) {
      console.error(
        "Unable to load gallery:",
        error
      );

      return res.status(500).json({
        message:
          "Unable to load gallery photos.",
      });
    }
  }
);


// ======================================
// DELETE GALLERY PHOTO
// ======================================

app.delete(
  "/api/gallery/photos/:filename",
  (req, res) => {
    try {
      const filename =
        req.params.filename;

      console.log(
        "Deleting photo:",
        filename
      );

      let gallery =
        readGallery();

      // Find the photo
      const photo =
        gallery.find(
          (item) =>
            item.filename ===
            filename
        );

      if (!photo) {
        return res.status(404).json({
          message:
            "Photo not found.",
        });
      }

      // Delete physical file
      const filePath =
        path.join(
          uploadFolder,
          filename
        );

      if (
        fs.existsSync(filePath)
      ) {
        fs.unlinkSync(filePath);

        console.log(
          "Physical file deleted:",
          filePath
        );
      }

      // Remove from gallery data
      gallery =
        gallery.filter(
          (item) =>
            item.filename !==
            filename
        );

      // Save updated gallery
      saveGallery(gallery);

      console.log(
        "Gallery data updated."
      );

      return res.json({
        message:
          "Photo deleted successfully.",
      });

    } catch (error) {
      console.error(
        "Delete error:",
        error
      );

      return res.status(500).json({
        message:
          "Unable to delete photo.",
      });
    }
  }
);


// ======================================
// MULTER / UPLOAD ERROR HANDLER
// ======================================

app.use(
  (
    error,
    req,
    res,
    next
  ) => {
    console.error(
      "\n========== UPLOAD ERROR =========="
    );

    console.error(error);

    console.error(
      "==================================\n"
    );

    return res.status(400).json({
      message:
        error.message ||
        "Photo upload failed.",
    });
  }
);


// ======================================
// HOME ROUTE
// ======================================

app.get(
  "/",
  (req, res) => {
    res.json({
      message:
        "PrudhviSai Events server is running!",
    });
  }
);


// ======================================
// START SERVER
// ======================================

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  "0.0.0.0",
  () => {
    console.log(
      `Server running on port ${PORT}`
    );
  }
);