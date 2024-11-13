import mongoose from "mongoose";

const GenreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const GenreModel = mongoose.model("Genre", GenreSchema);

export default GenreModel;
