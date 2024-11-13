import mongoose from "mongoose";

const ArtistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ArtistModel = mongoose.model("Artist", ArtistSchema);

export default ArtistModel;
