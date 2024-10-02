import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
    default: "",
  },
  favouriteSongs: {
    type: [
      {
        name: { type: String, required: true },
        link: { type: String, required: true },
      },
    ],
    default: [],
  },
  likedSongs: {
    type: [
      {
        name: { type: String, required: true },
        link: { type: String, required: true },
      },
    ],
    default: [],
  },
  password: {
    type: String,
    required: true,
  },
});

const EmployeeModel = mongoose.model("employees", EmployeeSchema);

export default EmployeeModel;
