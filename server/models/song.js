import mongoose from "mongoose";

const SongSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist", // References Artist model
      required: true,
    },
    genreId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre", // References Genre model
      required: true,
    },
    albumCover: {
      type: String,
      required: true,
    },
    previewLink: {
      type: String,
      required: true,
    },
    artistName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const SongModel = mongoose.model("Song", SongSchema);

export default SongModel;
