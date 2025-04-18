import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import EmployeeModel from "./models/Employee.js";
import ArtistModel from "./models/artist.js";
import SongModel from "./models/song.js";
import GenreModel from "./models/genre.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import axios from "axios";

// CONNECTING TO DATABASE
mongoose
  .connect(
    "mongodb+srv://amith:Hello%40mith18@mongodb.tyrxhwb.mongodb.net/Employee"
  )
  .then(() => {
    console.log("Connected to MongoDB database:", mongoose.connection.name);
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

// SETTING UP EXPRESS
const app = express();
app.use(express.json());
app.use(
  //Cross-Origin Resource Sharing (CORS)
  cors({
    // origin: ["https://tunes-music-app.vercel.app"],
    origin: ["http://localhost:5173", "https://tunes-music-app.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);
app.use(cookieParser());

// SECRET FOR JWT

const secret = "secret";

const keepAlive = () => {
  const appUrl = "https://tunesmusicapp.onrender.com"; // Replace with your actual URL

  axios
    .get(appUrl)
    .then((response) => {
      console.log(`Pinged ${appUrl} successfully.`);
    })
    .catch((error) => {
      console.log(`Error pinging the server: ${error.message}`);
    });
};

// Start the keep-alive function on server start
const startKeepAlive = () => {
  keepAlive(); // Send an initial ping

  // Set the function to run every 14 minutes (840 seconds)
  setInterval(keepAlive, 840 * 1000); // 840 seconds = 14 minutes
};

// Call the startKeepAlive function once the server is running
startKeepAlive();

// REGISTER ROUTE
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      EmployeeModel.create({ name, email, password: hash })
        .then((employees) => res.json(employees))
        .catch((err) => {
          if (err.code === 11000 && err.keyPattern.email) {
            res.status(400).json("Duplicate Email");
          } else {
            res.status(500).json(err);
          }
        });
    })
    .catch((err) => {
      console.error("Error hashing password:", err.message);
      res.status(500).json("Error hashing password");
    });
});

// LOGIN ROUTE
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (err) {
            console.error("Error comparing passwords:", err);
            res.status(500).json("Error comparing passwords");
          } else if (response) {
            const token = jwt.sign(
              { email: user.email, id: user._id },
              secret,
              {
                expiresIn: "1d",
              }
            );
            // Set the cookie with SameSite=None and Secure=true
            res.cookie("IAMIN", token, {
              httpOnly: true,
              secure: true, // Set to true for cross-origin requests
              sameSite: "None", // Required for cross-origin cookies
            });
            res.json({ message: "Success", email: user.email });
          } else {
            res.status(401).json("Incorrect password"); // Return status 401 for incorrect password
          }
        });
      } else {
        res.status(404).json("User not found"); // Return status 404 for user not found
      }
    })
    .catch((err) => {
      console.error("Error finding user:", err);
      res.status(500).json("Error finding user");
    });
});

// VERIFY TOKEN MIDDLEWARE
const verifyToken = (req, res, next) => {
  const token = req.cookies.IAMIN;
  if (!token) {
    return res.status(403).json("Not authenticated");
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(403).json("Token expired");
    }
    req.user = decoded;
    console.log("Decoded token:", decoded);
    next();
  });
};

// PROTECTED ROUTE
app.get("/", verifyToken, (req, res) => {
  res.json("Success");
});

// LOGOUT ROUTE
app.get("/logout", (req, res) => {
  res.cookie("IAMIN", "", {
    expires: new Date(0),
    httpOnly: true,
    secure: false,
  });
  res.json("Logged out");
});

//GET ALL USERS & THEIR DATA
app.get("/users", (req, res) => {
  EmployeeModel.find({})
    .then((users) => {
      if (!users || users.length === 0) {
        return res.status(404).json("No user found");
      } else {
        res.json(users);
      }
    })
    .catch((err) => res.status(500).json("Error fetching user data"));
});

//GET USER
app.get("/user", verifyToken, (req, res) => {
  EmployeeModel.findById(
    req.user.id,
    " email name bio favouriteSongs likedSongs"
  ) // Select name and bio fields
    .then((user) => {
      if (!user) {
        return res.status(404).json("User not found");
      } else {
        res.json({
          email: user.email,
          name: user.name,
          bio: user.bio,
          favouriteSongs: user.favouriteSongs,
          likedSongs: user.likedSongs,
        });
      }
    })
    .catch((err) => res.status(500).json("Error fetching user data"));
});

// SEARCH USER ROUTE

app.post("/searchUser", verifyToken, async (req, res) => {
  const { query } = req.body;

  try {
    // Find a user by either email or name
    const user = await EmployeeModel.findOne(
      {
        $or: [
          { email: query },
          { name: { $regex: query, $options: "i" } }, // Case-insensitive search for name
        ],
      },
      "name bio favouriteSongs likedSongs"
    );

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User found:", user);
    res.json(user);
  } catch (err) {
    console.error("Error searching for user:", err);
    res.status(500).json({ message: "Error searching for user" });
  }
});

//SUGGEST USERS
app.post("/suggestUsers", verifyToken, async (req, res) => {
  const { query } = req.body;

  try {
    // Find users whose names match the query (case-insensitive)
    const users = await EmployeeModel.find(
      {
        name: { $regex: query, $options: "i" }, // Case-insensitive search for name
      },
      "name bio favouriteSongs likedSongs" // Specify fields to return
    ).limit(5); // Limit results to 5 for performance

    if (users.length === 0) {
      console.log("No users found");
      return res.status(404).json({ message: "No users found" });
    }

    console.log("Users found:", users);
    res.json(users);
  } catch (err) {
    console.error("Error suggesting users:", err);
    res.status(500).json({ message: "Error suggesting users" });
  }
});

// UPDATE BIO ROUTE
app.post("/updateBio", verifyToken, (req, res) => {
  const { bio } = req.body;
  EmployeeModel.findByIdAndUpdate(req.user.id, { bio: bio }, { new: true })
    .then((user) => res.json(user))
    .catch((err) => {
      console.error("Error updating bio:", err); // Debugging statement
      res.status(500).json("Error updating bio");
    });
});

// ADD FAVOURITE SONGS ROUTE
app.post("/addFavouriteSong", verifyToken, async (req, res) => {
  const { songName, songLink } = req.body;

  //Validation;
  if (!songName || !songLink) {
    console.log("Add both");
    return res.status(400).json("Song name and link are required.");
  }

  try {
    const user = await EmployeeModel.findByIdAndUpdate(
      req.user.id,
      { $push: { favouriteSongs: { name: songName, link: songLink } } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json("User not found.");
    }

    res.json(user);
  } catch (err) {
    console.error("Error adding favorite song:", err);
    res.status(500).json("Error adding favorite song");
  }
});

// DELETE SONG
app.delete("/deleteFavouriteSong", verifyToken, (req, res) => {
  const { songId } = req.body;
  const userId = req.user.id;

  EmployeeModel.findByIdAndUpdate(
    userId,
    { $pull: { favouriteSongs: { _id: songId } } },
    { new: true }
  )
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
});

// LIKED SONGS ROUTE (like/unlike a song)
app.post("/likedSong", verifyToken, async (req, res) => {
  const { songName, songLink } = req.body;
  try {
    const user = await EmployeeModel.findById(req.user.id);
    const songIndex = user.likedSongs.findIndex(
      (song) => song.name === songName && song.link === songLink
    );

    if (songIndex > -1) {
      // Song already liked, so unlike it
      user.likedSongs.splice(songIndex, 1);
    } else {
      // Song not liked, so like it
      user.likedSongs.push({ name: songName, link: songLink });
    }

    await user.save();
    res.json(user.likedSongs); // Return updated liked songs
  } catch (err) {
    console.error("Error toggling liked song:", err);
    res.status(500).json("Error toggling liked song");
  }
});

//TO DELETE LIKED SONG
app.delete("/deleteLikedSong", verifyToken, (req, res) => {
  const { songId } = req.body;
  EmployeeModel.findByIdAndUpdate(
    req.user.id,
    { $pull: { likedSongs: { _id: songId } } },
    { new: true }
  )
    .then((user) => res.json(user))
    .catch((err) => {
      console.error("Error deleting liked song:", err);
      res.status(500).json("Error deleting liked song");
    });
});

// EXPLORE PAGE
// Get all artists
app.get("/artists", async (req, res) => {
  try {
    const artists = await ArtistModel.find(); // Fetch all artists
    res.status(200).json(artists); // Send the data as response
  } catch (error) {
    res.status(500).json({ message: "Error fetching artists", error });
  }
});

// Get all genres
app.get("/genres", async (req, res) => {
  try {
    const genres = await GenreModel.find(); // Fetch all genres
    res.status(200).json(genres); // Send the data as response
  } catch (error) {
    res.status(500).json({ message: "Error fetching genres", error });
  }
});

// Get all songs
app.get("/songs", async (req, res) => {
  try {
    const songs = await SongModel.find(); // Fetch all songs
    res.status(200).json(songs); // Send the data as response
  } catch (error) {
    res.status(500).json({ message: "Error fetching songs", error });
  }
});

// Get songs by artist name
app.get("/artists/:artistName", async (req, res) => {
  try {
    const artistName = req.params.artistName;
    console.log("Looking for artist:", artistName); // Debug log

    const artist = await ArtistModel.findOne({ name: artistName });

    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    res.status(200).json(artist);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get songs by genre name
app.get("/genre/:genreName", async (req, res) => {
  try {
    const genreName = req.params.genreName;
    console.log("Looking for genre:", genreName); // Debug log

    const genre = await GenreModel.findOne({ name: genreName });

    if (!genre) {
      return res.status(404).json({ message: "Genre not found" });
    }

    res.status(200).json(genre); // Send the songs associated with this genre
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(3000, () => {
  console.log("Server is working");
});
