const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");
const Gallery = require("./Gallery.cjs");

require("dotenv").config();

// ======================================
// MONGODB
// ======================================

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully.");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// ======================================
// EXPRESS
// ======================================

const app = express();

app.use(cors());
app.use(express.json());

// ======================================
// CLOUDINARY
// ======================================

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Cloudinary configured.");

// ======================================
// MULTER
// ======================================

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    console.log("Received file:", file.originalname);
    console.log("File type:", file.mimetype);

    if (allowedTypes.includes(file.mimetype)) {
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
// ADMIN LOGIN
// ======================================

app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
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
      message: "Login successful",
      token: token,
    });
  }

  return res.status(401).json({
    message: "Invalid email or password",
  });
});

// ======================================
// CLOUDINARY UPLOAD
// ======================================

function uploadToCloudinary(file) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "prudhvisai-events/gallery",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    stream.end(file.buffer);
  });
}

// ======================================
// UPLOAD GALLERY PHOTOS
// ======================================

app.post(
  "/api/gallery/upload",
  upload.array("photos", 20),
  async (req, res) => {
    console.log("");
    console.log("========== PHOTO UPLOAD ==========");

    const category = req.body.category || "Other Events";

    console.log("Category:", category);

    if (!req.files || req.files.length === 0) {
      console.log("NO FILES RECEIVED");

      return res.status(400).json({
        message: "No photos were received by the server.",
      });
    }

    console.log("Number of files:", req.files.length);

    try {
      const uploadedPhotos = [];

      for (const file of req.files) {
        console.log(
          "Uploading to Cloudinary:",
          file.originalname
        );

        const result = await uploadToCloudinary(file);

        console.log(
          "Cloudinary upload successful:",
          result.secure_url
        );

        const photo = new Gallery({
          filename: result.public_id,
          originalName: file.originalname,
          category: category,
          url: result.secure_url,
          publicId: result.public_id,
        });

        await photo.save();

        uploadedPhotos.push(photo);
      }

      console.log("MongoDB gallery data saved.");
      console.log("UPLOAD SUCCESS");
      console.log("=================================");
      console.log("");

      return res.json({
        message: "Photos uploaded successfully.",
        photos: uploadedPhotos,
      });
    } catch (error) {
      console.error("Gallery upload error:", error);

      return res.status(500).json({
        message: "Unable to upload photos.",
      });
    }
  }
);

// ======================================
// GET GALLERY PHOTOS
// ======================================

app.get("/api/gallery/photos", async (req, res) => {
  try {
    const photos = await Gallery.find().sort({
      createdAt: -1,
    });

    console.log("Gallery photos found:", photos.length);

    return res.json({
      photos: photos,
    });
  } catch (error) {
    console.error("Unable to load gallery:", error);

    return res.status(500).json({
      message: "Unable to load gallery photos.",
    });
  }
});
// ======================================
// DELETE GALLERY PHOTO
// ======================================

app.delete(
  "/api/gallery/photos/:filename",
  async (req, res) => {
    try {
      const filename = req.params.filename;

      console.log("Deleting photo:", filename);

      const photo = await Gallery.findOne({
        filename: filename,
      });

      if (!photo) {
        return res.status(404).json({
          message: "Photo not found.",
        });
      }

      // Delete from Cloudinary
      if (photo.publicId) {
        try {
          await cloudinary.uploader.destroy(
            photo.publicId,
            {
              resource_type: "image",
            }
          );

          console.log(
            "Cloudinary image deleted:",
            photo.publicId
          );
        } catch (cloudinaryError) {
          console.error(
            "Cloudinary delete error:",
            cloudinaryError
          );
        }
      }

      // Delete from MongoDB
      await Gallery.deleteOne({
        _id: photo._id,
      });

      console.log("MongoDB gallery data updated.");

      return res.json({
        message: "Photo deleted successfully.",
      });
    } catch (error) {
      console.error("Delete error:", error);

      return res.status(500).json({
        message: "Unable to delete photo.",
      });
    }
  }
);

// ======================================
// ERROR HANDLER
// ======================================

app.use((error, req, res, next) => {
  console.error("");
  console.error("========== UPLOAD ERROR ==========");
  console.error(error);
  console.error("==================================");
  console.error("");

  return res.status(400).json({
    message:
      error.message || "Photo upload failed.",
  });
});

// ======================================
// HOME
// ======================================

app.get("/", (req, res) => {
  res.json({
    message: "PrudhviSai Events server is running!",
  });
});

// ======================================
// START SERVER
// ======================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});